import { describe, vi, expect, test, type Mock } from "vitest";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { nextTick, ref } from "vue";

import { mockMultiplePageSearchMemo, mockOverallResponse, mockSearchMemosResponse, mockErrorReturnSearchMemo, mockCreateMemoSuccess, mockInputCreateMemo } from "./mockData/mockData";
import { useCreateMemo, useSearchMemo } from "@/composables/useMemo";
import { reFormatRut } from "@/composables/stringUtils/formatRut";
import { useOverall } from "@/composables/useOverall";

vi.mock('@tanstack/vue-query', () => ({
    useQuery: vi.fn(),
    keepPreviousData: true,
    useMutation: vi.fn(),
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
    test('returns correctly formatted data when theres only 1 value', async () => {
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

    test('returns error when search doesnt return anything', async () => {
        const mockQuery = {
            data: mockErrorReturnSearchMemo,
            isLoading: false,
            isError: true,
        };

        (useQuery as Mock).mockReturnValue(mockQuery);
        const { data, isLoading, isError } = useSearchMemo(ref(0), ref(true), ref(''), ref(''), ref('unexisting address'));
        await nextTick();

        expect(data).toEqual(mockErrorReturnSearchMemo);
        expect(data.value.statusCode).toEqual(400);
        expect(data.value.message).toEqual('No se ha encontrado ningún memo con los datos ingresados.');
        expect(isLoading).toEqual(false);
        expect(isError).toEqual(true);
    })
})

describe('create memo', () => {
    test('can create a memo', async () => {
        const mockCreateMemo = {
            mutate: vi.fn().mockResolvedValue({
                data: mockCreateMemoSuccess,
                isPending: false,
            }),
        };

        const inputs = {
            tipo: mockInputCreateMemo.infoInputs.tipo,
            patente: mockInputCreateMemo.infoInputs.patente,
            rut: reFormatRut(mockInputCreateMemo.userInputs.rut),
            nombre: mockInputCreateMemo.userInputs.nombre,
            calle: mockInputCreateMemo.directionInputs.calle,
            numero: mockInputCreateMemo.directionInputs.numero,
            aclaratoria: mockInputCreateMemo.directionInputs.aclaratoria,
            periodo: mockInputCreateMemo.infoInputs.periodo,
            capital: parseFloat(mockInputCreateMemo.financesInputs.capital),
            afecto: parseInt(mockInputCreateMemo.financesInputs.afecto),
            total: parseFloat(mockInputCreateMemo.financesInputs.total),
            emision: parseInt(mockInputCreateMemo.financesInputs.emision),
            fechaPagos: mockInputCreateMemo.labelInputs.fechaPagos,
            giro: mockInputCreateMemo.labelInputs.giro,
            agtp: mockInputCreateMemo.labelInputs.agtp,
            nombre_representante: mockInputCreateMemo.representantInputs.nombre,
            rut_representante: mockInputCreateMemo.representantInputs.rut
        };

        (useMutation as Mock).mockReturnValue(mockCreateMemo);
        const mutation = useCreateMemo({
            userInputs: ref(mockInputCreateMemo.userInputs),
            infoInputs: ref(mockInputCreateMemo.infoInputs),
            directionInputs: ref(mockInputCreateMemo.directionInputs),
            financesInputs: ref(mockInputCreateMemo.financesInputs),
            labelInputs: ref(mockInputCreateMemo.labelInputs),
            representantInputs: ref(mockInputCreateMemo.representantInputs)
        });
        mutation.mutate(inputs);

        expect(mockCreateMemo.mutate).toHaveBeenCalled();
        expect(mockCreateMemo.mutate).toHaveBeenCalledWith(inputs);

        const res = await mockCreateMemo.mutate.mock.results[0].value;
        expect(res.isPending).toEqual(false);
        expect(res.data.value.message).toEqual("Memorándum creado con éxito!");
    })
})
