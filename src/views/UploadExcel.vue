<script lang="ts" setup>
import { toast } from 'vue-sonner';
import { ref } from 'vue';

import { useExcelTemplate, useUploadExcel } from '@/composables/useExcel';
import { Button } from '@/components/ui/button';

const excel = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const { mutate, isPending } = useUploadExcel({ excel, fileInput });

const { isLoading, isError, error, refetch } = useExcelTemplate();

const handleSubmit = async () => {
  if (!excel.value) {
    toast.error('Debes seleccionar un archivo excel');
    return;
  }

  const formData = new FormData();
  formData.append('excel', excel.value as unknown as Blob);

  try {
    mutate(formData);
  } catch(error) {
    console.error(error);
  }
}

const storeFile = (event: Event) => {
  const target = event.target as HTMLInputElement;
  excel.value = target.files![0];
}

const downloadTemplate = async () => {
  refetch();
}
</script>

<template>
  <div class="min-h-screen flex flex-col gap-y-5 items-center justify-center">
    <div class="flex flex-col items-center bg-card rounded-lg bg-white dark:bg-inherit border border-slate-300 dark:border-slate-700 p-6 shadow-sm max-w-md w-full">
      <h1 class="text-3xl font-bold text-black dark:text-white">Subir archivo excel</h1>

      <section class="flex flex-col items-center mt-6 gap-y-4 my-4 w-full h-20">
        <label for="file" class="w-full h-full flex flex-col my-auto border-[1px] border-dashed border-slate-500">
          <p class="text-slate-700 dark:text-slate-300 m-auto">Seleccione el archivo excel:</p>

          <p class="text-slate-700 dark:text-slate-300 m-auto" v-if="excel === null">No has seleccionado un archivo aún</p>
          <p class="text-slate-700 dark:text-slate-300 m-auto" v-else>{{ excel.name }}</p>
        </label>
        <input class="opacity-0 absolute -z-10" type="file" id="file" ref="fileInput" accept=".xls, .xlsx" @change="storeFile" />
      </section>
      
      <Button
        variant="outline"
        size="lg"
        :disabled="isPending"
        @click="handleSubmit"
      >
        Subir excel
      </Button>
    </div>

    <div class="flex flex-row items-center gap-x-5">
      <p class="text-slate-500 my-4">Descarga una plantilla aquí:</p>
      <Button
          variant="outline"
          size="lg"
          :disabled="isLoading"
          @click="downloadTemplate"
        >
          Descargar plantilla
      </Button>
    </div>

    <span v-if="isError">
      {{ error }}
    </span>

  </div>
</template>
