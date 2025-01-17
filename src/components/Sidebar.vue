<script lang="ts" setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';

import { Button } from './ui/button';
import ThemeToggle from './ThemeToggle.vue';

const router = useRouter()
const route = useRoute()

</script>

<template>
    <nav class="w-64 h-screen bg-background dark:bg-slate-900 border-r">
        <div class="p-4">
            <h1 class="text-2xl font-bold mb-4 dark:text-white">Bienvenido</h1>
            <div class="space-y-2">
                <span v-for="item in router.options.routes">
                    <RouterLink :to="item.path">
                        <Button :variant="route.path == item.path ? 'secondary' : 'ghost'" class="dark:text-white">{{ item.name }}</Button>
                    </RouterLink>
                </span>
            </div>
        </div>
        <div className="absolute bottom-6 left-4">
            <ThemeToggle />
        </div>
    </nav>    
</template>
