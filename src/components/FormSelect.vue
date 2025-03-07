<script lang="ts" setup>
import { Label, SelectContent, SelectGroup, SelectItem, SelectItemIndicator, SelectItemText, SelectLabel, SelectPortal, SelectRoot, SelectTrigger, SelectValue, SelectViewport } from 'radix-vue';
import { Icon } from "@iconify/vue";

const types = ["COMER", "PROFE", "INDUS", "ALCOH", "MEF"];

defineProps({
    tipo: {
        type: String,
        default: ''
    },
})

defineEmits([
    'update:tipo'
])
</script>

<template>
    <section class="flex flex-col w-full text-black dark:text-white">
    <Label class="text-[15px] font-semibold leading-[35px] text-black dark:text-white" for="tipo">Tipo de patente</Label>
        <SelectRoot :value="tipo || ''" @update:model-value="$emit('update:tipo', $event)">
            <SelectTrigger
                class="border b-slate-100 inline-flex min-w-[160px] items-center justify-between rounded px-[15px] text-[13px] leading-none h-[35px] gap-[5px] shadow-[0_0px_5px] dark:shadow-[0_2px_10px] dark:shadow-black/10 hover:bg-gray-200 dark:hover:bg-gray-800 focus:shadow-[0_0_0_2px] focus:shadow-white dark:focus:shadow-black data-[placeholder]:text-slate-500"
            >
                <SelectValue placeholder="Selecciona un tipo de patente..." />
                <Icon
                    icon="radix-icons:chevron-down"
                    class="h-3.5 w-3.5"
                />
            </SelectTrigger>

            <SelectPortal>
                <SelectContent
                    class="min-w-[160px] bg-gray-200 dark:bg-gray-800 rounded shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[100]"
                >

                <SelectViewport class="p-[5px]">
                    <SelectLabel class="px-[25px] text-xs leading-[25px] text-slate-800 dark:text-slate-400">
                        Tipos
                    </SelectLabel>
                    <SelectGroup>
                        <SelectItem
                            v-for="(type, index) in types"
                            :key="index"
                            class="text-[13px] leading-none text-black dark:text-white rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-slate-300 dark:data-[highlighted]:bg-slate-700 data-[highlighted]:text-indigo-800 dark:data-[highlighted]:text-indigo-400"
                            :value="type"
                        >
                            <SelectItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                                <Icon icon="radix-icons:check" />
                            </SelectItemIndicator>
                            <SelectItemText>
                                {{ type }}
                            </SelectItemText>
                        </SelectItem>
                    </SelectGroup>
                </SelectViewport>
                </SelectContent>
            </SelectPortal>
        </SelectRoot>
    </section>
</template>
