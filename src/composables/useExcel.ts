import { useMutation, useQuery } from "@tanstack/vue-query";
import { toast } from "vue-sonner";
import type { Ref } from "vue";

import { downloadExcelData, downloadExcelTemplate } from '@/api/excelService';
import { uploadExcel } from "@/api/excelService";

interface uploadExcelInterface {
    excel: Ref<File | null>,
    fileInput: Ref<HTMLInputElement | null>
}

export const useUploadExcel = ({ excel, fileInput }: uploadExcelInterface) => {
    return useMutation({
        mutationFn: uploadExcel,
        onMutate: async () => {
        const loading = toast.loading('Subiendo archivo excel...');

        return { loading };
        },
        onSuccess: (_, __, context) => {
        toast.success('Datos subidos exitosamente!');
        toast.dismiss(context?.loading);

        excel.value = null;
        fileInput.value!.value = '';
        },
        onError: (error, _, context) => {
        toast.error('Ha ocurrido un error al subir el archivo excel.');
        toast.dismiss(context?.loading);
        console.error(error);
        }
    });
}

export const useExcelTemplate = () => {
    return useQuery({
        queryKey: ['exceltemplate'],
        queryFn: downloadExcelTemplate,
        enabled: false
    })
}

export const useDownloadData = () => {
    return useQuery({
        queryKey: ['excelData'],
        queryFn: downloadExcelData,
        enabled: false
    })
}
