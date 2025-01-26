<script setup lang="ts">
import { useOverall } from '@/composables/useOverall';
import { Skeleton } from '@/components/ui/skeleton';

const { isLoading, isError, error, data } = useOverall();

</script>

<template>
    <div class="min-h-screen flex items-center text-black dark:text-white justify-center p-4">
        <div class="flex flex-col items-center bg-card rounded-lg border bg-white dark:bg-inherit border-slate-700 p-6 shadow-sm max-w-md w-full">
            <h3 class="text-3xl font-bold">Resumen general</h3>
            <p class="pb-10 pt-2 text-slate-600 dark:text-slate-400">Lista de memorándums 2010-2024</p>

            <span v-if="isLoading">
                <table style="width:100%;" class="text-slate-600 dark:text-slate-400 mb-2">
                    <tr v-for="(_, index) in new Array(3)" :key="index" class="border border-slate-200 dark:border-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700">
                        <td class="p-2">
                            <Skeleton class="h-4 w-full px-14" />
                        </td>
                        <td class="p-2" style="width:30%;"></td>
                        <td class="text-right p-2">
                            <Skeleton class="h-4 w-full px-14" />
                        </td>
                    </tr>
                </table>
            </span>
            <span v-else-if="isError || error" class="flex flex-col justify-center text-center">
                <p>Ha habido un error, intenta más tarde.</p>
                <p>Detalles del error:</p>
                <p class="text-slate-500 my-4">{{ error }}</p>
            </span>
            <span v-else-if="data" class="w-9/12">
                <table style="width:100%;" class="text-slate-600 dark:text-slate-400 mb-2">
                    <tr v-for="(count, index) in data.totalCount" :key="`${index}column`"  class="border border-slate-200 dark:border-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700">
                        <td class="p-2">{{ count.count }}</td>
                        <td class="p-2" style="width:30%;"></td>
                        <td class="text-right p-2">{{ count.label }}</td>
                    </tr>
                </table>
            </span>
        </div>
    </div>
</template>
