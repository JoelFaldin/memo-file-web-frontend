import { useMutation, useQuery } from "@tanstack/vue-query";

import { downloadExcelData, downloadExcelTemplate } from '@/api/excelService';
import { uploadExcel } from "@/api/excelService";

export const useUploadExcel = () => {
    return useMutation({
        mutationFn: uploadExcel
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
