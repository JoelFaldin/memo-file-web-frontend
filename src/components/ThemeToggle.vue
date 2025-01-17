<script lang="ts" setup>
import { IconSun, IconMoon } from '@tabler/icons-vue';
import { useColorMode } from '@vueuse/core';
import { ref } from 'vue';

import DropdownMenu from './ui/dropdown-menu/DropdownMenu.vue';
import DropdownMenuContent from './ui/dropdown-menu/DropdownMenuContent.vue';
import DropdownMenuItem from './ui/dropdown-menu/DropdownMenuItem.vue';
import DropdownMenuTrigger from './ui/dropdown-menu/DropdownMenuTrigger.vue';

const mode = useColorMode()
const modeTracker = ref(mode)

</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button variant="outline" size="icon">
                <span v-if="modeTracker == 'light'">
                    <IconSun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" :color="mode == 'light' ? 'black' : mode == 'dark' ? 'white' : 'black'" />
                </span>
                <span v-else="modeTracker == 'dark'">
                    <IconMoon class="h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" :color="mode == 'light' ? 'black' : mode == 'dark' ? 'white' : 'black'" />
                </span>
                <span class="sr-only">Cambiar tema</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem @click="mode = 'light'">
                Claro
            </DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'dark'">
                Oscuro
            </DropdownMenuItem>
            <DropdownMenuItem @click="mode = 'auto'">
                Sistema
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
