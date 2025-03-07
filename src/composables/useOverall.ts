import { useQuery } from "@tanstack/vue-query";

import { fetchOverall } from '@/api/memoService.ts';

export const useOverall = () => {
    return useQuery({
        queryKey: ['overall'],
        queryFn: fetchOverall
    });
}
