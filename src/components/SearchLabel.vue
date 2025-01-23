<script lang="ts" setup>
import { Label } from 'radix-vue';

const props = defineProps({
    param: String
})

defineEmits([
    `update:param`
])
</script>

<template>
    <span class="flex flex-col">
        <Label class="text-[15px] font-semibold leading-[35px] text-black dark:text-white">
            <slot />
        </Label>
        <input
            class="inline-flex h-[35px] w-[200px] appearance-none items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px_black] selection:color-white"
            type="text"
            :value="props.param"
            @input="$emit(`update:param`, ($event.target as HTMLInputElement).value)"
        >
    </span>
</template>
