import { keepPreviousData, useQuery } from '@tanstack/vue-query';

import { getMemos } from '@/api/memoService.ts';
import type { Ref } from 'vue';

export const useSearchMemo = (page: Ref<number>, enabled: Ref<boolean>, rol: Ref<string>, rut: Ref<string>, direction: Ref<string>) => {
  return useQuery({
    queryKey: ['searchedMemos', page],
    queryFn: () => getMemos(rol.value, rut.value, direction.value, page),
    enabled: enabled.value,
    placeholderData: keepPreviousData,
  });
}