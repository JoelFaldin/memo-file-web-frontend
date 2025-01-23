<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { Label } from 'radix-vue';
import { ref } from 'vue';

import MemoTable from '@/components/MemoTable.vue';
import { getMemos } from '@/api/memoService.ts';

const rol = ref('');
const rut = ref('');
const direction = ref('');

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['searchedMemos'],
  queryFn: () => getMemos(rol.value, rut.value, direction.value),
  enabled: false
});

const searchMemo = async () => {  
  if (!rol.value && !rut.value && !direction.value) {
    alert('Debes indicar un rol, rut o dirección para buscar!');
    return;
  }
  
  try {    
    await refetch();

    rol.value = '';
    rut.value = '';
    direction.value = '';
  } catch(error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col gap-y-10 items-center justify-start p-4">
    <div class="flex flex-col justify-center items-center gap-y-2">
      <section  class="flex flex-row gap-x-10 items-center justify-center bg-white dark:bg-inherit rounded-lg border border-slate-700 p-6 shadow-sm w-fit">
        <span class="flex flex-col">
          <Label class="text-[15px] font-semibold leading-[35px] text-black dark:text-white">
            Buscar por rol (patente):
          </Label>
          <input
            class="inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white"
            type="text"
            v-model="rol"
          >
        </span>
  
        <span class="flex flex-col">
          <Label class="text-[15px] font-semibold leading-[35px] text-black dark:text-white">
            Buscar por rut:
          </Label>
          <input
            class="inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white"
            type="text"
            v-model="rut"
            placeholder="12.345.678-9"
          >
        </span>
  
        <span class="flex flex-col">
          <Label class="text-[15px] font-semibold leading-[35px] text-black dark:text-white">
            Buscar por dirección:
          </Label>
          <input
            class="inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white"
            type="text"
            v-model="direction"
          >
        </span>
        
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
    <section v-else-if="data?.joinedMemos?.length === 0">
      <p>No hay memos con la patente indicada.</p>
    </section>
    <section v-else-if="data?.joinedMemos">
      <p class="text-center mb-5 text-slate-600 dark:text-slate-400">Total: {{ data.total }}</p>

      <MemoTable :data="data" />
    </section>
  </div>
</template>

<style scoped>

</style>