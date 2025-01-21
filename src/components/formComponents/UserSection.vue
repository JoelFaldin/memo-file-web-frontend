<script lang="ts" setup>
import { Label } from 'radix-vue';

defineProps({
    rut: String,
    nombre: String
})

defineEmits([
    'update:rut',
    'update:nombre'
])

</script>

<template>
    <span class="flex flex-col gap-y-4">
        <section class="flex flex-col w-full">
            <Label class="text-[15px] font-semibold leading-[35px] text-white" for="rut">Rut</Label>
            <input
                id="rut"
                class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
                type="text"
                :value="rut"
                @input="$emit('update:rut', ($event.target as HTMLInputElement).value)"
            />
        </section>
        <section class="flex flex-col w-full">
            <Label for="name">Nombre</Label>
            <input
                id="name"
                class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
                type="text"
                :value="nombre"
                @input="$emit('update:nombre', ($event.target as HTMLInputElement).value)"
            />
        </section>
    </span>
</template>
