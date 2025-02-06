<script lang="ts" setup name="SidebarMenu">
import { RouterLink, useRoute, useRouter } from 'vue-router';

import ThemeToggle from './ThemeToggle.vue';
import { Button } from './ui/button';

const router = useRouter();
const route = useRoute();

</script>

<template>
    <nav class="w-64 h-screen bg-background dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
        <div class="p-4">
            <h1 class="text-2xl font-bold mb-4 dark:text-white">Bienvenido</h1>
            <div class="space-y-2">
                <span v-for="(item, index) in router.options.routes" :key="`router${index}`">
                    <RouterLink :to="item.path">
                        <Button class="dark:text-white w-full justify-start my-1 py-4" :variant="route.path == item.path ? 'secondary' : 'ghost'">
                            <component :is="item.meta?.icon" v-if="item.meta?.icon" class="mr-2" />
                            {{ item.name }}
                        </Button>
                    </RouterLink>
                </span>
            </div>
        </div>
        <div className="absolute bottom-6 left-4">
            <ThemeToggle />
        </div>
    </nav>
</template>
