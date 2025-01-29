<script lang="ts" setup>
import { TableBody, TableCell, TableRow } from './ui/table';
import { Skeleton } from './ui/skeleton';

</script>

<template>
    <TableBody>
        <TableRow v-for="(_, index) in new Array(11)" :key="`rowSkeleton${index}`" class="border-slate-500 text-black dark:text-white">
            <TableCell v-for="(_, index) in new Array(14)" :key="`cellSkeleton${index}`">
                <Skeleton class="h-4 w-full px-4" />
            </TableCell>
        </TableRow>
    </TableBody>
</template>
