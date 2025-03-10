<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRaw, watch } from 'vue';
import { toast } from 'vue-sonner';

import { fixStringLength } from '@/composables/stringUtils/fixStringLength';
import { formatCurrency } from '@/composables/stringUtils/formatCurrency';
import { formatPayTime } from '@/composables/stringUtils/formatPayTime';
import { Table, TableBody, TableCell, TableRow } from './ui/table';
import { formatTime } from '@/composables/stringUtils/formatTime';
import { formatRut } from '@/composables/stringUtils/formatRut';
import type { Memo } from '@/interfaces/memoInterface';
import TableHead from './TableHead.vue';

const props = defineProps<{
    data: {
        findMemo: Memo[],
        total: number;
        totalPages: number;
        nextPage: boolean;
    }[],
    infiniteLoading: boolean,
    isInfiniteError: boolean,
    infiniteError: unknown,
    infiniteRefetch: () => void,
    infiniteFetchNext: () => void,
    infiniteHasNext: boolean,
}>();

const observer = ref<IntersectionObserver | null>(null);
const observerTarget = ref(null);
const queryRef = ref(props.data);

const setupObserver = () => {
    if (observer.value) {
        observer.value.disconnect();
    }

    observer.value = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting && props.infiniteHasNext) {
                props.infiniteFetchNext();
                queryRef.value = toRaw(props.data)
            }
        },
        { rootMargin: '300px' },
    );

    if (observerTarget.value) observer.value.observe(observerTarget.value);
}

onMounted(setupObserver);
onUnmounted(() => observer.value?.disconnect());

watch(() => props.infiniteError, (val) => {
    if (val) {
        toast.error("Hubo un error al intentar conseguir los datos. Inténtalo más tarde.");
        console.log(props.infiniteError);
    }
})
</script>

<template>
    <Table class="border border-slate-500">
        <TableHead />

        <TableBody>
        <TableRow v-for="row in queryRef.map(page => page.findMemo).flat()" :key="row.id" class="border-slate-500 text-black dark:text-white">
            <TableCell>{{ formatRut(row.local.rut_local) }}</TableCell>
            <TableCell>{{ row.tipo }}</TableCell>
            <TableCell>{{ row.local.patente }}</TableCell>
            <TableCell :title="fixStringLength(row.direccion).fullText">{{ fixStringLength(row.direccion).newString }}</TableCell>
            <TableCell>{{ formatTime(row.periodo) }}</TableCell>
            <TableCell>{{ formatCurrency(parseFloat(row.capital)) }}</TableCell>
            <TableCell>{{ row.afecto }}</TableCell>
            <TableCell>{{ formatCurrency(parseFloat(row.total)) }}</TableCell>
            <TableCell>{{ row.emision }}</TableCell>
            <TableCell :title="fixStringLength(row.giro).fullText">{{ fixStringLength(row.giro).newString }}</TableCell>
            <TableCell>{{ row.agtp }}</TableCell>
            <TableCell>{{ formatPayTime(row.pay_times.day, row.pay_times.month, row.pay_times.year) }}</TableCell>
            <TableCell :title="fixStringLength(row.local.representantes?.nombre_representante).fullText">{{ fixStringLength(row.local.representantes?.nombre_representante).newString }}</TableCell>
            <TableCell>{{ row.local.representantes?.rut_representante }}</TableCell>
        </TableRow>
        </TableBody>
    </Table>

    <div ref="observerTarget" class="h-1" />
</template>
