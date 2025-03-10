import type { NewMemoInterface } from "@/interfaces/memoInterface";
import type { Ref } from "vue";

const URL = `${import.meta.env.VITE_BACKEND_URL}/memo`;

export const fetchOverall = async () => {
    try {
        const res = await fetch(`${URL}/overall`);
        const response = await res.json();

        if (!res.ok) throw new Error(response.message);

        return response;
    } catch(error) {
        throw error;
    }
}

export const getMemos = async (rol: Ref<string>, rut: Ref<string>, direction: Ref<string>, page: Ref<number>) => {
    const newRut = rut.value.split('').filter((n) => n != '.').join('');

    try {
        const res = await fetch(`${URL}/find?rol=${rol.value}&rut=${newRut}&direction=${direction.value}&page=${page.value}&limit=10`);
        const response = await res.json();

        if (!res.ok) throw new Error(response.message);

        return response;
    } catch(error) {
        throw error;
    }
}

export const fetchInfiniteMemos = async (rol: string, rut: string, direction: string, pageParam: number) => {
    const newRut = rut.split('').filter((n) => n != '.').join('');

    try {
        const res = await fetch(`${URL}/infinite?rol=${rol}&rut=${newRut}&direction=${direction}&pageparam=${pageParam}&limit=40`);
        const response = await res.json();

        if (!res.ok) throw new Error(response.message);

        return response;
    } catch (error) {
        throw error;
    }
}

export const uploadMemo = async (newMemo: NewMemoInterface) => {
    try {
        const res = await fetch(`${URL}/create`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(newMemo)
        });

        const response = await res.json();

        if (!res.ok) throw new Error(response.message);

        return response;
    } catch(error) {
        throw error;
    }
}
