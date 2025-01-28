import { keepPreviousData, useQuery } from "@tanstack/vue-query";
import { describe, vi, expect, test, type Mock } from "vitest";
import { nextTick, ref } from "vue";

import { useOverall } from "@/composables/useOverall";
import { useSearchMemo } from "@/composables/useMemo";
import exp from "constants";

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

const mockSearchMemosResponse = {
    "message": "Memos encontrados!",
    findMemo: [
        {
            "id": "randomId",
            "rut": "1000000-7",
            "direccion": "VIVAR",
            "tipo": "COMER",
            "patente": "400000-9",
            "periodo": "20151S",
            "capital": "100000",
            "afecto": 50,
            "total": "150000",
            "emision": 0,
            "giro": "COMERCIALIZACION ART.DE VESTI",
            "agtp": "0",
            "pay_times": {
                "memo_id": "randomId",
                "day": 1,
                "month": 2,
                "year": 2015
            }
        }
    ],
    "total": 1,
    "nextPage": false,
    "totalPages": 1
}

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
})

describe('use memorandums', () => {
    test('returns correclty formatted data', async () => {
        const mockQuery = {
            data: mockSearchMemosResponse,
            isLoading: false,
            isError: false
        };

        (useQuery as Mock).mockReturnValue(mockQuery);
        const { data, isLoading, isError } = useSearchMemo(ref(1), ref(true), ref(""), ref(""), ref("vivar"));
        await nextTick();

        expect(data).toEqual(mockSearchMemosResponse);
        expect(isLoading).toEqual(false);
        expect(isError).toEqual(false);
    })
})
