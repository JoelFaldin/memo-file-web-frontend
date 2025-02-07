import type { NewMemoInterface } from "@/interfaces/memoInterface";
import type { Ref } from "vue";

const URL = `${import.meta.env.VITE_BACKEND_URL}/memo`;

export const fetchOverall = async () => {
  try {
    const res = await fetch(`${URL}/overall`);
    const response = await res.json();

    if (!res.ok) {
      return Promise.reject(response.message);
    }

    return response;
  } catch(error) {
    return Promise.reject(error);
  }
}

export const getMemos = async (rol: string, rut: string, direction: string, page: Ref<number>) => {
  const newRut = rut.split('').filter((n) => n != '.').join('');

  try {
    const res = await fetch(`${URL}/find?rol=${rol}&rut=${newRut}&direction=${direction}&page=${page.value}&limit=10`);
    const response = await res.json();

    if (!res.ok) {
      return Promise.reject(response.message);
    }

    return response;
  } catch(error) {
    return Promise.reject(error);
  }
}

export const fetchInfiniteMemos = async (rol: string, rut: string, direction: string, pageParam: number | boolean) => {
  const newRut = rut.split('').filter((n) => n != '.').join('');

  try {
    const res = await fetch(`${URL}/find?rol=${rol}&rut=${newRut}&direction=${direction}&page=${pageParam}&limit=10`);
    const response = await res.json();

    if (!res.ok) {
      return Promise.reject(response.message);
    }

    return response;
  } catch (error) {
    return Promise.reject(error);
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

    if (!res.ok) {
      return Promise.reject(response.message);
    }

    return response;
  } catch(error) {
    return Promise.reject(error);
  }
}
