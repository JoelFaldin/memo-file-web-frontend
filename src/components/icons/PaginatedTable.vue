<script setup lang="ts">
import { ref } from 'vue';

import type { DataInterface } from '@/interfaces/memoInterface';
import MemoTable from '../MemoTable.vue';
import TableSkeleton from '@/components/TableSkeleton.vue';
import TableHead from '@/components/TableHead.vue';
import { Button } from '@/components/ui/button';
import { Table } from '@/components/ui/table';

const enableSearch = ref(false);
const page = ref(1);

const props = defineProps<{
  rol: string;
  rut: string;
  direction: string;
  data: DataInterface;
  isLoading: boolean;
  isError: boolean,
  error: unknown;
  refecth: () => void;
  isPlaceholderData: boolean;
}>();

const goPreviousPage = () => {
  enableSearch.value = true;
  page.value = Math.max(page.value - 1, 1);
}

const goNextPage = () => {
  enableSearch.value = true;
  if (!props.isPlaceholderData) {
      page.value = page.value + 1;
  }
}
</script>

<template>
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
      <p class="text-black dark:text-white">No hay memos con la patente indicada.</p>
    </section>

    <section v-if="data?.findMemo">
      <div>
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
            <span class="text-black dark:text-white">
              Anterior
            </span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            :disabled="!data.nextPage || isLoading"
            @click="goNextPage"
          >
            <span class="text-black dark:text-white">
              Siguiente
            </span>
          </Button>
        </div>
      </div>
    </section>
</template>
