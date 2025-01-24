import type { NewMemoInterface } from "@/interfaces/memoInterface";
import type { Ref } from "vue";

const URL = 'http://localhost:3000/memo'

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
  const newRut = rut.split('').filter((n) => n != '.').join('')

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