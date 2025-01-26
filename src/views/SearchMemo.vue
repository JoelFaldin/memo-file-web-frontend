<script setup lang="ts">
import { ref } from 'vue';

import TableSkeleton from '@/components/TableSkeleton.vue';
import SearchLabel from '@/components/SearchLabel.vue';
import { useSearchMemo } from '@/composables/useMemo';
import MemoTable from '@/components/MemoTable.vue';
import TableHead from '@/components/TableHead.vue';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';

const rol = ref('');
const rut = ref('');
const direction = ref('');
const page = ref(1);
const enabled = ref(false);

const { data, isLoading, isError, error, refetch, isPlaceholderData } = useSearchMemo(page, enabled, rol, rut, direction);

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
          Buscar
        </Button>
    </div>

    <section v-if="isLoading">
      <Table class="border border-slate-500">
        <TableHead />
        <TableSkeleton />
      </Table>
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

      <p class="mb-5 text-slate-600 dark:text-slate-400">Página {{ page }} de {{ data.totalPages }}</p>
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