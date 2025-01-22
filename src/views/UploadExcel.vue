<script lang="ts" setup>
import { useMutation } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import { ref } from 'vue';

import { uploadExcel } from '@/api/excelService';

const excel = ref<File | null>(null);

const { mutate, isPending } = useMutation({
  mutationFn: uploadExcel,
  onMutate: async () => {
    const loading = toast.loading('Subiendo archivo excel...');

    return { loading };
  },
  onSuccess: (_, __, context) => {
    toast.success('Datos subidos exitosamente!');
    toast.dismiss(context?.loading);

    excel.value = null;
  },
  onError: (error, _, context) => {
    toast.error('Ha ocurrido un error al subir el archivo excel.');
    toast.dismiss(context?.loading);
    console.error(error);
  }
});

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append('excel', excel.value as unknown as Blob);

  try {
    mutate(formData)
  } catch(error) {
    console.error(error);
  }
}

const storeFile = (event: Event) => {
  const target = event.target as HTMLInputElement
  excel.value = target.files![0]
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div :class="`flex flex-col items-center bg-card rounded-lg border border-slate-700 p-6 shadow-sm max-w-md w-full`">
      <h1 class="text-3xl font-bold">Subir archivo excel</h1>

      <section class="flex flex-col items-center mt-6 gap-y-4 my-4 w-full h-20">
        <label for="file" class="w-full h-full flex flex-col my-auto border-[1px] border-dashed b-slate-500">
          <p class="text-slate-300 m-auto">Seleccione el archivo excel:</p>

          <p class="text-slate-300 m-auto" v-if="excel === null">No has seleccionado un archivo aún</p>
          <p class="text-slate-300 m-auto" v-else>{{ excel.name }}</p>
        </label>
        <input class="opacity-0 absolute -z-10" type="file" id="file" accept=".xls, .xlsx" @change="storeFile" />
      </section>
    
      <button :class="`h-[35px] mt-5 inline-flex items-center rounded-md ${isPending ? 'bg-slate-400 focus-visible:outline-slate-500 cursor-default' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'} px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`" :disabled="isPending" @click="handleSubmit">Subir excel</button>
    </div>
  </div>
</template>
