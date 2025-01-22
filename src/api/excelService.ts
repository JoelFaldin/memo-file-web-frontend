const URL = 'http://localhost:3000/excel';

export const uploadExcel = async (formData: FormData) => {
  try {
    const res = await fetch(`${URL}/upload`, {
      method: 'POST',
      body: formData
    });
    const response = await res.json();

    if (!res.ok) {
      return Promise.reject(response.message);
    }

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
}