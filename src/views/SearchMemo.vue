<script setup lang="ts">
import { keepPreviousData, useQuery } from '@tanstack/vue-query';
import { ref } from 'vue';

import SearchLabel from '@/components/SearchLabel.vue';
import MemoTable from '@/components/MemoTable.vue';
import { getMemos } from '@/api/memoService.ts';
import { Button } from '@/components/ui/button';

const rol = ref('');
const rut = ref('');
const direction = ref('');
const page = ref(1);
const enabled = ref(false);

const { data, isLoading, isError, error, refetch, isPlaceholderData } = useQuery({
  queryKey: ['searchedMemos', page],
  queryFn: () => getMemos(rol.value, rut.value, direction.value, page),
  enabled,
  placeholderData: keepPreviousData,
});

const searchMemo = async () => {  
  if (!rol.value && !rut.value && !direction.value) {
    alert('Debes indicar un rol, rut o dirección para buscar!');
    return;
  }
  
  try {    
    await refetch();
  } catch(error) {
    console.error(error);
  }
}

const goPreviousPage = () => {
  enabled.value = true;
  page.value = Math.max(page.value - 1, 1);
}

const goNextPage = () => {
  enabled.value = true;
  if (!isPlaceholderData.value) {
      page.value = page.value + 1;
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col gap-y-10 items-center justify-start p-4">
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
      <button :class="`h-[35px] inline-flex items-center rounded-md w-fit ${isLoading ? 'bg-slate-500' : 'bg-indigo-600'} px-3 py-2 text-sm font-semibold text-white shadow-sm ${isLoading ? 'hover:bg-slate-500' : 'hover:bg-indigo-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${isLoading ? 'focus-visible:outline-slate-500' : 'focus-visible:outline-indigo-600'}`" @click="searchMemo" :disabled="isLoading" >
        Buscar
      </button>
    </div>

    <section v-if="isLoading">
      Buscando memos...
    </section>
    <section v-else-if="isError || error" class="text-center">
      <p class="text-slate-500 my-4">{{ error ?? 'Ha ocurrido un error al intentar buscar memorándums con esa patente.' }}</p>
    </section>
    <section v-else-if="data?.findMemo?.length === 0">
      <p>No hay memos con la patente indicada.</p>
    </section>
    <section v-else-if="data?.findMemo">
      <p class="text-center mb-5 text-slate-600 dark:text-slate-400">Total: {{ data.total }}</p>

      <MemoTable :data="data" />

      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="page === 1"
          @click="goPreviousPage"
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!data.nextPage"
          @click="goNextPage"
        >
          Siguiente
        </Button>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>