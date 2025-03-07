<script lang="ts" setup>
import { toast } from 'vue-sonner';
import { ref } from 'vue';

import { useDownloadData, useExcelTemplate, useUploadExcel } from '@/composables/useExcel';
import ExcelCard from '@/components/ExcelCard.vue';
import { Button } from '@/components/ui/button';

const excel = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const { mutateAsync, isPending } = useUploadExcel();

const { isLoading: isTemplateLoading, refetch: templateRefetch } = useExcelTemplate();
const { isLoading: isExcelDataLoading, refetch: excelDataRefetch } = useDownloadData();

const handleSubmit = async () => {
    if (!excel.value) {
        toast.error('Debes seleccionar un archivo excel');
        return;
    }

    const formData = new FormData();
    formData.append('excel', excel.value as unknown as Blob);

    const loading = toast.loading('Subiendo archivo excel...');

    try {
        const res = await mutateAsync(formData);
        const { error: mutateError } = res;

        if (mutateError) throw mutateError;

        excel.value = null;
        fileInput.value!.value = '';

        toast.dismiss(loading);
        toast.success("Datos subidos exitosamente!");
    } catch(error) {
        toast.dismiss(loading);
        toast.error("Ha ocurrido un error al subir el archivo excel.");

        console.error(error);
    }
}

const storeFile = (event: Event) => {
    const target = event.target as HTMLInputElement;
    excel.value = target.files![0];
}

const downloadTemplate = async () => {
    const loading = toast.loading("Descargando la plantilla...");

    try {
        const res = await templateRefetch();
        const { error: templateError } = res;

        if (templateError) throw templateError;

        toast.dismiss(loading);
        toast.success("Plantilla descargada!");
    } catch (error) {
        toast.dismiss(loading);
        toast.error("Ha ocurrido un error al intentar descargar la plantilla. Inténtalo nuevamente.");

        console.log(error);
    }
}

const downloadExcelData = async () => {
    const loading = toast.loading("Descargando excel con memorándums. Esto puede tardar un momento.");

    try {
        const res = await excelDataRefetch();
        const { error: excelDataError } = res;

        if (excelDataError) throw excelDataError;

        toast.dismiss(loading);
        toast.success("Excel con memorándums descargado con éxito!");
    } catch (error) {
        toast.dismiss(loading);
        toast.error("Ha ocurrido un error al intentar descargar el archivo. Revisa tu conexión e inténtalo más tarde.");

        console.log(error);
    }
}
</script>

<template>
    <div class="flex flex-col xl:flex-row py-10 items-center justify-center h-screen lg:gap-x-10 gap-y-10">
        <div class="flex flex-col items-center bg-card rounded-lg bg-white dark:bg-inherit border border-slate-300 dark:border-slate-700 p-6 shadow-sm max-w-md w-full h-72">
        <h1 class="text-3xl font-bold text-black dark:text-white">Subir archivo excel</h1>
        <p class=" text-center text-slate-700 dark:text-slate-300 m-auto mt-3 text-sm underline underline-offset-4">Importante: el formato de fecha es 20201201 (yyyy-mm-dd)!</p>

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
            <span class="text-black dark:text-white">
            Subir excel
            </span>
        </Button>
        </div>

        <ExcelCard
        title="Descarga la plantilla"
        desc="Asegúrate de que la información esté correctamente formateada para guardarla en la base de datos!"
        :disabled="isTemplateLoading"
        button-text="Descargar plantilla"
        @handle:click="downloadTemplate"
        />

        <ExcelCard
        title="Descargar excel con memos"
        desc="Ésta acción descargará en tu equipo un archivo excel que contiene todos los datos de la base de datos!"
        :disabled="isExcelDataLoading"
        button-text="Descargar excel"
        @handle:click="downloadExcelData"
        />

    </div>
</template>
