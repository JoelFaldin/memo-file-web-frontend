<script lang="ts" setup>
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody,TableCell } from './ui/table';

const headers = ["Memo Id", "Rut", "Tipo", "Patente", "Periodo", "Capital", "Afecto", "Total", "Emisión", "Giro", "AGTP", "Fecha de pago"];

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
            <TableRow v-for="row in props.data.joinedMemos" class="border-slate-500 text-black dark:text-white">
                <TableCell>{{ row.id }}</TableCell>
                <TableCell>{{ row.rut }}</TableCell>
                <TableCell>{{ row.tipo }}</TableCell>
                <TableCell>{{ row.patente }}</TableCell>
                <TableCell>{{ row.periodo }}</TableCell>
                <TableCell>{{ parseFloat(row.capital) }}</TableCell>
                <TableCell>{{ row.afecto }}</TableCell>
                <TableCell>{{ row.total }}</TableCell>
                <TableCell>{{ row.emision }}</TableCell>
                <TableCell>{{ row.giro }}</TableCell>
                <TableCell>{{ row.agtp }}</TableCell>
                <TableCell>{{ row.pay_times }}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
</template>
