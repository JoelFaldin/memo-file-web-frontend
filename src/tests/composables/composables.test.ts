import { describe, vi, expect, test, type Mock } from "vitest";
import { useQuery } from "@tanstack/vue-query";
import { nextTick, ref } from "vue";

import { mockMultiplePageSearchMemo, mockOverallResponse, mockSearchMemosResponse } from "./mockData";
import { useOverall } from "@/composables/useOverall";
import { useSearchMemo } from "@/composables/useMemo";

vi.mock('@tanstack/vue-query', () => ({
    useQuery: vi.fn(),
    keepPreviousData: true
}))

describe('fetch overall', () => {
    test('returns correctly formatted data', async () => {
        const mockQuery = {
            data: mockOverallResponse,
            isLoading: false,
            isError: false
        };

        (useQuery as Mock).mockReturnValue(mockQuery);
        const { data, isLoading, isError } = useOverall();
        await nextTick();

        expect(data).toEqual(mockOverallResponse);
        expect(isLoading).toEqual(false);
        expect(isError).toEqual(false);
    });

    test('returns true loading value while loading', async () => {
        const mockQuery = {
            data: undefined,
            isLoading: true,
            isError: false
        };

        (useQuery as Mock).mockReturnValue(mockQuery);
        const { data, isLoading, isError } = useOverall();
        await nextTick();

        expect(data).toEqual(undefined);
        expect(isLoading).toEqual(true);
        expect(isError).toEqual(false);
    });

    test('returns error', async () => {
        const mockQuery = {
            data: undefined,
            isLoading: false,
            isError: true
        };

        (useQuery as Mock).mockReturnValue(mockQuery);
        const { data, isLoading, isError } = useOverall();
        await nextTick();

        expect(data).toBeUndefined();
        expect(isLoading).toEqual(false);
        expect(isError).toEqual(true);
    })
})

describe('use memorandums', () => {
    test('returns correclty formatted data when theres only 1 value', async () => {
        const mockQuery = {
            data: mockSearchMemosResponse,
            isLoading: false,
            isError: false
        };

        (useQuery as Mock).mockReturnValue(mockQuery);
        const { data, isLoading, isError } = useSearchMemo(ref(1), ref(true), ref(""), ref(""), ref("vivar"));
        await nextTick();

        expect(data).toEqual(mockSearchMemosResponse);
        expect(data.value.nextPage).toEqual(false);
        expect(data.value.totalPages).toEqual(1);
        expect(isLoading).toEqual(false);
        expect(isError).toEqual(false);
    });

    test('returns correct next page and total pages value', async () => {
        const mockQuery = {
            data: mockMultiplePageSearchMemo,
            isLoading: false,
            isError: false,
        };

        (useQuery as Mock).mockReturnValue(mockQuery);
        const { data, isLoading, isError } = useSearchMemo(ref(1), ref(true), ref(""), ref(""), ref("vivar"));
        await nextTick();

        expect(data).toEqual(mockMultiplePageSearchMemo);
        expect(data.value.nextPage).toBe(true);
        expect(data.value.totalPages).toBe(2);
        expect(isLoading).toEqual(false);
        expect(isError).toEqual(false);
    })
})
