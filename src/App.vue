<script setup lang="ts">
import { useColorMode } from '@vueuse/core';
import { Toaster } from 'vue-sonner';

import Sidebar from './components/Sidebar.vue';

const mode = useColorMode()

</script>

<template>
  <div class="flex h-screen">
    
    <Sidebar />
    <section :class="`${mode == 'light' ? 'bgSectionLight' : 'bgSectionDark'} flex-1 overflow-y-auto text-white`">
      <Toaster :theme="mode == 'light' ? 'light' : 'dark'" richColors position="bottom-right" />
      <RouterView />
    </section>
  </div>
</template>

<style scoped>
  .bgSectionDark {
    background: linear-gradient(to bottom, #1e1e2e, #12121a);
  }
  .bgSectionLight {
    background: linear-gradient(to bottom, #ffffff, #cecece)
  }
</style>
