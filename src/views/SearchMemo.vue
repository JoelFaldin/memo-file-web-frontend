<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import SearchLabel from '@/components/SearchLabel.vue';
import MemoTable from '@/components/MemoTable.vue';
import { Button } from '@/components/ui/button';
import PaginatedTable from '@/components/icons/PaginatedTable.vue';

const rol = ref('');
const rut = ref('');
const direction = ref('');
const page = ref(1);

const enableSearch = ref(false);
const enableInfinite = ref(false);
const isInfiniteScroll = ref(false);
const observerTarget = ref(null);

const { data, isLoading, isError, error, refetch, isPlaceholderData } = useSearchMemo(page, enableSearch, rol, rut, direction);
// const { data: infiniteData, isLoading: infiniteLoading, isError: isInfiniteError, error: infiniteError, refetch: infiniteRefetch, fetchNextPage: infiniteFetchNext, hasNextPage: infiniteHasNext } = useInfiniteSearch(rol, rut, direction, enableInfinite)

const searchMemo = async () => {
  if (!rol.value && !rut.value && !direction.value) {
    alert('Debes indicar un rol, rut o dirección para buscar!');
    return;
  }

  try {
    if (isInfiniteScroll.value) {
      // await infiniteRefetch();
      enableInfinite.value = false;
    } else {
      await refetch();
      enableSearch.value = false;
    }
  } catch(error) {
    console.error(error);
  }
}

// const observer = ref<IntersectionObserver | null>(null);

// const setupObserver = () => {
//   if (observer.value) {
//     observer.value.disconnect();
//   }

//   observer.value = new IntersectionObserver(
//     (entries) => {
//       if (entries[0].isIntersecting && hasNextPage.value) {
//         fetchNextPage();
//       }
//     },
//     { rootMargin: '100px' },
//   );

//   if (observerTarget.value) observer.value.observe(observerTarget.value);
// }

// onMounted(setupObserver);
// onUnmounted(() => observer.value?.disconnect());
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
      <p>INFINITE SCROLL DUDE</p>
      <MemoTable :data="data" />
    </div>
    <div v-else>
      <section v-if="data?.findMemo">
        <PaginatedTable :rol="rol" :rut="rut" :direction="direction" :data="data" :isLoading="isLoading" :isError="isError" :error="error" :refecth="refetch" :isPlaceholderData="isPlaceholderData" />

        <div ref="observerTarget"></div>
      </section>
    </div>
  </div>
</template>
