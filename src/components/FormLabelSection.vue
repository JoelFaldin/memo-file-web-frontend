<script lang="ts" setup>
import { Label } from 'radix-vue';


defineProps({
    fechaPagos: String,
    giro: String,
    agtp: String
})

defineEmits([
    'update:fechaPagos',
    'update:giro',
    'update:agtp'
])

</script>

<template>
    <span class="flex flex-col gap-y-4 w-11/12 mx-auto">
        <section class="flex flex-col w-full">
            <Label class="text-[15px] font-semibold leading-[35px] text-white" for="fechaPago">Fecha de pago</Label>
            <input
            id="fechaPago"
                class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
                type="text"
                :value="fechaPagos"
                @input="$emit('update:fechaPagos', ($event.target as HTMLInputElement).value)"
                placeholder="dd-mm-aaaa"
            />
            <p class="text-sm text-slate-400 mt-1">Por ejemplo, 01-02-2025 (01 de febrero, 2025)</p>
        </section>
        <section class="flex flex-col w-full">
            <Label class="text-[15px] font-semibold leading-[35px] text-white" for="giro">Giro</Label>
            <input
            id="giro"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="text"
            :value="giro"
            @input="$emit('update:giro', ($event.target as HTMLInputElement).value)"
            />
        </section>
        <section class="flex flex-col w-full">
            <Label class="text-[15px] font-semibold leading-[35px] text-white" for="agtp">AGTP</Label>
            <input
            id="agtp"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="text"
            :value="agtp"
            @input="$emit('update:agtp', ($event.target as HTMLInputElement).value)"
            />
        </section>
    </span>
</template>
