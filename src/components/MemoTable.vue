<script lang="ts" setup>
import { fixStringLength } from '@/composables/fixStringLength';

import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody,TableCell } from './ui/table';
import { formatCurrency } from '@/composables/formatCurrency';
import { formatRut } from '@/composables/formatRut';
import { formatTime } from '@/composables/formatTime';
import { formatPayTime } from '@/composables/formatPayTime';

const headers = ["Rut", "Tipo", "Patente", "Dirección", "Periodo", "Capital", "Afecto", "Total", "Emisión", "Giro", "AGTP", "Fecha de pago"];

const props = defineProps(['data']);
</script>

<template>
    <Table class="border border-slate-500">
        <TableCaption class="text-slate-600 dark:text-slate-400">Lista de memos</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead v-for="header in headers">
                    {{ header }}
                </TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            <TableRow v-for="row in props.data.findMemo" class="border-slate-500 text-black dark:text-white">
                <TableCell>{{ formatRut(row.rut) }}</TableCell>
                <TableCell>{{ row.tipo }}</TableCell>
                <TableCell>{{ row.patente }}</TableCell>
                <TableCell :title="fixStringLength(row.direccion).fullText">{{ fixStringLength(row.direccion).newString }}</TableCell>
                <TableCell>{{ formatTime(row.periodo) }}</TableCell>
                <TableCell>{{ formatCurrency(parseFloat(row.capital)) }}</TableCell>
                <TableCell>{{ row.afecto }}</TableCell>
                <TableCell>{{ formatCurrency(row.total) }}</TableCell>
                <TableCell>{{ row.emision }}</TableCell>
                <TableCell :title="fixStringLength(row.giro).fullText">{{ fixStringLength(row.giro).newString }}</TableCell>
                <TableCell>{{ row.agtp }}</TableCell>
                <TableCell>{{ formatPayTime(row.pay_times.day, row.pay_times.month, row.pay_times.year) }}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>
