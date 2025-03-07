import { keepPreviousData, useInfiniteQuery, useMutation, useQuery } from '@tanstack/vue-query';
import type { Ref } from 'vue';

import { fetchInfiniteMemos, getMemos, uploadMemo } from '@/api/memoService.ts';

export const useSearchMemo = (
  page: Ref<number>,
  enabled: Ref<boolean>,
  rol: Ref<string>,
  rut: Ref<string>,
  direction: Ref<string>,
) => {
  return useQuery({
    queryKey: ['searchedMemos', page],
    queryFn: () => getMemos(rol, rut, direction, page),
    enabled: enabled,
    placeholderData: keepPreviousData,
  })
}

export const useInfiniteSearch = (
  rol: Ref<string>,
  rut: Ref<string>,
  direction: Ref<string>,
  enableInfinite: Ref<boolean>,
) => {
  return useInfiniteQuery({
    queryKey: ['infiniteMemos'],
    queryFn: ({ pageParam = 0 }) =>
      fetchInfiniteMemos(rol.value, rut.value, direction.value, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.page;
    },
    initialPageParam: 0,
    enabled: enableInfinite,
  })
}

export const useCreateMemo = () => {
  return useMutation({
    mutationFn: uploadMemo,
  })
}
