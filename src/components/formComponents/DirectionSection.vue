<script lang="ts" setup>
import { Label } from 'radix-vue';

const props = defineProps({
    calle: String,
    numero: String,
    aclaratoria: String
})

defineEmits([
    'update:calle',
    'update:numero',
    'update:aclaratoria'
])

</script>

<template>
    <span class="flex flex-col gap-y-4 w-11/12 m-auto">
        <section class="flex flex-col w-full">
            <Label class="text-[15px] font-semibold leading-[35px] text-white" for="calle">Calle</Label>
            <input
            id="calle"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="text"
            :value="props.calle"
            @input="$emit('update:calle', ($event.target as HTMLInputElement).value)"
            />
        </section>
        <section class="flex flex-col w-full">
            <Label class="text-[15px] font-semibold leading-[35px] text-white" for="numero">Número</Label>
            <input
            id="numero"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="text"
            :value="props.numero"
            @input="$emit('update:numero', ($event.target as HTMLInputElement).value)"
            />
        </section>
        <section class="flex flex-col w-full">
            <Label class="text-[15px] font-semibold leading-[35px] text-white" for="aclaratoria">Aclaratoria</Label>
            <input
            id="aclaratoria"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            type="text"
            :value="props.aclaratoria"
            @input="$emit('update:aclaratoria', ($event.target as HTMLInputElement).value)"
            />
        </section>
    </span>
</template>
