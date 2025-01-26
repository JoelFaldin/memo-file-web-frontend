<script lang="ts" setup>
import { TableCaption, TableHead, TableHeader, TableRow } from './ui/table';

const headers = ["Rut", "Tipo", "Patente", "Dirección", "Periodo", "Capital", "Afecto", "Total", "Emisión", "Giro", "AGTP", "Fecha de pago"];

</script>

<template>
    <TableCaption class="text-slate-600 dark:text-slate-400">Lista de memos</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead v-for="(header, index) in headers" :key="`head${index}`">
                    {{ header }}
                </TableHead>
            </TableRow>
        </TableHeader>
</template>
