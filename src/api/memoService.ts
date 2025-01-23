import type { NewMemoInterface } from "@/interfaces/memoInterface";

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

export const getMemos = async (rol: string, rut: string, direction: string) => {
  try {
    const res = await fetch(`${URL}/find?rol=${rol}&rut=${rut}&direction=${direction}`);
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