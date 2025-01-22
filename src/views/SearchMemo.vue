<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { Label } from 'radix-vue';
import { ref } from 'vue';

import MemoTable from '@/components/MemoTable.vue';

const patente = ref('');

const getMemos = async (patente: string) => {
  try {
    const res = await fetch(`http://localhost:3000/memo/${patente}`);
    const response = await res.json();

    if (!res.ok) {
      return Promise.reject(response.message);
    }

    return response;
  } catch(error) {
    return Promise.reject(error);
  }
}

const { data, isLoading, isError, error, refetch } = useQuery({
  queryKey: ['searchedMemos'],
  queryFn: () => getMemos(patente.value),
  enabled: false
});

const searchMemo = async () => {  
  if (!patente.value) {
    alert('No has indicado una patente!');
    return;
  }
  
  try {    
    await refetch();

    patente.value = '';
  } catch(error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col gap-y-10 items-center justify-start p-4">
    <section  class="flex flex-col items-center bg-card rounded-lg border border-slate-700 p-6 shadow-sm max-w-md w-full">
      <Label class="text-[15px] font-semibold leading-[35px] text-white">
        Buscar memorándum (por patente):
      </Label>
      <input
        class="inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white"
        type="text"
        v-model="patente"
      >

      <button :class="`h-[35px] mt-5 inline-flex items-center rounded-md ${isLoading ? 'bg-slate-500' : 'bg-indigo-600'} px-3 py-2 text-sm font-semibold text-white shadow-sm ${isLoading ? 'hover:bg-slate-500' : 'hover:bg-indigo-500'} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${isLoading ? 'focus-visible:outline-slate-500' : 'focus-visible:outline-indigo-600'}`" @click="searchMemo" :disabled="isLoading" >
        Buscar
      </button>
    </section>

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
      <p class="text-center mb-5 text-slate-400">Total: {{ data.total }}</p>

      <MemoTable :data="data" />
    </section>
  </div>
</template>

<style scoped>

</style>