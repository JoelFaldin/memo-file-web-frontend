<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import MemoTable from './MemoTable.vue';
import type { DataInterface } from '@/interfaces/memoInterface';

const props = defineProps<{
  data: {
    pages?: {
      target: {
        findMemo: DataInterface[],
        message: string,
        nextPage: boolean,
        totalPages: number,
      }
    }[],
  },
  infiniteLoading: boolean,
  isInfiniteError: boolean,
  infiniteError: unknown,
  infiniteRefetch: () => void,
  infiniteFetchNext: () => void,
  infiniteHasNext: boolean,

}>();

const observer = ref<IntersectionObserver | null>(null);
const observerTarget = ref(null);

const setupObserver = () => {
  if (observer.value) {
    observer.value.disconnect();
  }

  observer.value = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && props.infiniteHasNext) {
        props.infiniteFetchNext();
      }
    },
    { rootMargin: '100px' },
  );

  if (observerTarget.value) observer.value.observe(observerTarget.value);
}

onMounted(setupObserver);
onUnmounted(() => observer.value?.disconnect());

console.log(props.data);
</script>

<template>
  <p>INFINITE SCROLL DUDE</p>
  <MemoTable :data="props.data" />

  <div ref="observerTarget"></div>
</template>
