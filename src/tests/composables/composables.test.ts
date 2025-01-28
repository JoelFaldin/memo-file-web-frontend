import { useQuery } from "@tanstack/vue-query";
import { describe, vi, expect, test, type Mock } from "vitest";
import { nextTick } from "vue";

import { useOverall } from "@/composables/useOverall";

const mockOverallResponse = {
    "totalCount": [
        {
            "label": "Memorándums",
            "count": 10,
        },
        {
            "label": "Fechas de pago",
            "count": 10,
        },
        {
            "label": "Usuarios únicos",
            "count": 8,
        },
    ]
};

vi.mock('@tanstack/vue-query', () => ({
    useQuery: vi.fn()
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
    })
})
