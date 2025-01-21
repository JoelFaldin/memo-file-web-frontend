<script lang="ts" setup>
import { Label } from 'radix-vue';


defineProps({
    capital: String,
    afecto: String,
    total: String,
    emision: String
})

defineEmits([
    'update:capital',
    'update:afecto',
    'update:total',
    'update:emision'
])

</script>

<template>
    <span class="flex flex-col gap-y-4 w-11/12 mx-auto">
        <section class="flex flex-col w-full">
            <Label class="text-[15px] font-semibold leading-[35px] text-white" for="capital">Capital</Label>
            <input
                id="capital"
                class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
                type="number"
                :value="capital"
                @input="$emit('update:capital', ($event.target as HTMLInputElement).value)"
            />
        </section>
        <section class="flex flex-col w-full">
            <Label class="text-[15px] font-semibold leading-[35px] text-white" for="afecto">Afecto</Label>
            <input
                id="afecto"
                class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
                type="number"
                :value="afecto"
                @input="$emit('update:afecto', ($event.target as HTMLInputElement).value)"
            />
        </section>
        <section class="flex flex-col w-full">
            <Label class="text-[15px] font-semibold leading-[35px] text-white" for="total">Total</Label>
            <input
                id="total"
                class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
                type="number"
                :value="total"
                @input="$emit('update:total', ($event.target as HTMLInputElement).value)"
            />
        </section>
        <section class="flex flex-col w-full">
            <Label class="text-[15px] font-semibold leading-[35px] text-white" for="emision">Emisión</Label>
            <input
                id="emision"
                class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
                type="number"
                :value="emision"
                @input="$emit('update:emision', ($event.target as HTMLInputElement).value)"
            />
        </section>
    </span>
</template>
