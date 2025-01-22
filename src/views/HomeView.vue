<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

const fetchData = async () => {
    try {
        const res = await fetch('http://localhost:3000/memo/overall');
        const response = await res.json();

        if (!res.ok) {
            return Promise.reject(response.message);
        }
    
        return response;
    } catch(error) {
        return Promise.reject(error);
    }
}

const { isLoading, isError, data, error } = useQuery({
    queryKey: ['overall'],
    queryFn: fetchData
});

</script>

<template>
    <div class="min-h-screen flex items-center justify-center p-4">
        <div :class="`flex flex-col items-center bg-card rounded-lg border border-slate-700 p-6 shadow-sm max-w-md w-full`">
            <h3 class="text-3xl font-bold">Resumen general</h3>
            <p class="pb-10 pt-2 text-slate-400">Lista de memorándums 2010-2024</p>

            <span v-if="isLoading">
                <p>Cargando tabla resumen...</p>
            </span>
            <span v-else-if="isError || error" class="flex flex-col justify-center text-center">
                <p>Ha habido un error, intenta más tarde.</p>
                <p>Detalles del error:</p>
                <p class="text-slate-500 my-4">{{ error }}</p>
            </span>
            <span v-else-if="data" class="w-9/12">
                <table style="width:100%;" class="text-slate-400 mb-2">
                    <tr v-for="count in data.totalCount"  class="border border-slate-800 hover:bg-slate-700">
                        <td class="p-2">{{ count.count }}</td>
                        <td class="p-2" style="width:30%;"></td>
                        <td class="text-right p-2">{{ count.label }}</td>
                    </tr>
                </table>
            </span>
            </div>
        </div>
</template>
