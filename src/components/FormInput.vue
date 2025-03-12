<script lang="ts" setup>
import { Label } from 'radix-vue';

defineProps({
    label: String,
    id: String,
    value: String,
    type: String,
    name: String
})

defineEmits([
    'clear:error'
])
</script>

<template>
    <section class="flex flex-col w-full">
        <Label class="text-[15px] font-semibold leading-[35px] text-black dark:text-white" :for="id">{{ label }}</Label>
        <input
            :id="id"
            class="w-full inline-flex h-[35px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none bg-inherit text-black dark:text-white shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_white] selection:color-white"
            :type="type"
            :value="value"
            @input="$emit('clear:error', name)"
            :name="name"
        />
        <slot />
    </section>
</template>
