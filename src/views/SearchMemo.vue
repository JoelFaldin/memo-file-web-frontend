<script setup lang="ts">
import { toast } from 'vue-sonner';
import { ref } from 'vue';

import { useInfiniteSearch, useSearchMemo } from '@/composables/useMemo';
import PaginatedTable from '@/components/PaginatedTable.vue';
import InfiniteTable from '@/components/InfiniteTable.vue';
import SearchLabel from '@/components/SearchLabel.vue';
import { Button } from '@/components/ui/button';

const rol = ref('');
const rut = ref('');
const direction = ref('');
const page = ref(1);

const enableSearch = ref(false);
const enableInfinite = ref(false);
const isInfiniteScroll = ref(false);

const { data, isLoading, isError, error, refetch, isPlaceholderData } = useSearchMemo(page, enableSearch, rol, rut, direction);
const { data: infiniteData, isLoading: infiniteLoading, isError: isInfiniteError, error: infiniteError, refetch: infiniteRefetch, fetchNextPage: infiniteFetchNext, hasNextPage: infiniteHasNext } = useInfiniteSearch(rol, rut, direction, enableInfinite)

const searchMemo = async () => {
  if (!rol.value && !rut.value && !direction.value) {
    alert('Debes indicar un rol, rut o dirección para buscar!');
    return;
  }

  const loading = toast.loading("Buscando memorándums...");

  try {
    if (isInfiniteScroll.value) {
      const res = await infiniteRefetch();
      const { error: infiniteScrollError } = res;

      if (infiniteScrollError) {
        throw infiniteScrollError;
      }

      enableInfinite.value = false;
    } else {
      const res = await refetch();
      const { error: refetchError } = res;

      if (refetchError) {
        throw refetchError;
      }

      enableSearch.value = false;
    }

    toast.dismiss(loading);
    toast.success("Memorándums encontrados!");
  } catch(error) {
    toast.dismiss(loading);
    toast.error("Ha ocurrido un error al intentar buscar los memorándums. Inténtalo más tarde.");

    console.error(error);
  }
}

const updatePage = (newPage: number) => {
  page.value = newPage;
  refetch();
}
</script>

<template>
  <div class="min-h-screen flex flex-col gap-y-8 items-center justify-start p-4">
    <div class="flex flex-col justify-center items-center gap-y-2">
      <section  class="flex flex-row gap-x-10 items-center justify-center bg-white dark:bg-inherit rounded-lg border border-slate-700 p-6 shadow-sm w-fit">
        <SearchLabel v-model:param="rol">
          Buscar por rol (patente):
        </SearchLabel>

        <SearchLabel v-model:param="rut">
          Buscar por rut:
        </SearchLabel>

        <SearchLabel v-model:param="direction">
          Buscar por dirección:
        </SearchLabel>
      </section>

      <Button
        variant="outline"
        size="lg"
        :disabled="isLoading"
        @click="searchMemo"
      >
        <span class="text-black dark:text-white">
          Buscar
        </span>
      </Button>

      <span class="flex flex-row justify-center items-center gap-x-3">
        <input type="checkbox" id="infiniteSearch" v-model="isInfiniteScroll" />
        <label for="infiniteSearch" class="text-slate-600 dark:text-slate-400">Scroll infinito</label>
      </span>
    </div>

    <div v-if="isInfiniteScroll">
      <section v-if="infiniteData?.pages">
        <InfiniteTable
          :data="infiniteData.pages"
          :infiniteLoading="infiniteLoading"
          :isInfiniteError="isInfiniteError"
          :infiniteError="infiniteError"
          :infiniteRefetch="infiniteRefetch"
          :infiniteFetchNext="infiniteFetchNext"
          :infiniteHasNext="infiniteHasNext"
        />
      </section>
    </div>
    <div v-else>
      <section v-if="data?.findMemo">
        <PaginatedTable
          :rol="rol"
          :rut="rut"
          :direction="direction"
          :data="data"
          :isLoading="isLoading"
          :isError="isError"
          :error="error"
          :refetch="refetch"
          :isPlaceholderData="isPlaceholderData"
          :page="page"
          @update:page="updatePage"
        />
      </section>
    </div>
  </div>
</template>
