<script lang="ts" setup>

import { fixStringLength } from '@/composables/stringUtils/fixStringLength';
import { formatCurrency } from '@/composables/stringUtils/formatCurrency';
import { formatPayTime } from '@/composables/stringUtils/formatPayTime';
import { Table, TableRow, TableBody, TableCell } from './ui/table';
import { formatTime } from '@/composables/stringUtils/formatTime';
import { formatRut } from '@/composables/stringUtils/formatRut';
import TableHead from './TableHead.vue';

const props = defineProps(['data']);
</script>

<template>
    <Table class="border border-slate-500">
        <TableHead />

        <TableBody>
            <TableRow v-for="row in props.data.findMemo" :key="row.id" class="border-slate-500 text-black dark:text-white">
                <TableCell>{{ formatRut(row.rut) }}</TableCell>
                <TableCell>{{ row.tipo }}</TableCell>
                <TableCell>{{ row.patente }}</TableCell>
                <TableCell :title="fixStringLength(row.direccion).fullText">{{ fixStringLength(row.direccion).newString }}</TableCell>
                <TableCell>{{ formatTime(row.periodo) }}</TableCell>
                <TableCell>{{ formatCurrency(parseFloat(row.capital)) }}</TableCell>
                <TableCell>{{ row.afecto }}</TableCell>
                <TableCell>{{ formatCurrency(parseFloat(row.total)) }}</TableCell>
                <TableCell>{{ row.emision }}</TableCell>
                <TableCell :title="fixStringLength(row.giro).fullText">{{ fixStringLength(row.giro).newString }}</TableCell>
                <TableCell>{{ row.agtp }}</TableCell>
                <TableCell>{{ formatPayTime(row.pay_times.day, row.pay_times.month, row.pay_times.year) }}</TableCell>
                <TableCell :title="fixStringLength(row.representantes.nombre_representante).fullText">{{ fixStringLength(row.representantes.nombre_representante).newString }}</TableCell>
                <TableCell>{{ row.representantes.rut_representante }}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>
