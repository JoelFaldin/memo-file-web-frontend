<script lang="ts" setup>
import { Button } from '@/components/ui/button';

defineProps({
  title: String,
  desc: String,
  disabled: Boolean,
  buttonText: String,
})

defineEmits([
  'handle:click'
])
</script>

<template>
  <div class="flex flex-col items-center bg-card rounded-lg bg-white dark:bg-inherit border border-slate-300 dark:border-slate-700 p-6 shadow-sm max-w-md w-full h-72">
  <h2 class="text-3xl font-bold text-black dark:text-white">{{ title }}</h2>
  <p class="text-center text-slate-700 dark:text-slate-300 mt-3 text-sm underline underline-offset-4">{{ desc }}</p>
  <Button
    class="my-auto"
    variant="outline"
    size="lg"
    :disabled="disabled"
    @click="$emit('handle:click')"
  >
    <span class="text-black dark:text-white">
      {{  buttonText  }}
    </span>
  </Button>
</div>
</template>
