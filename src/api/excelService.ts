const URL = 'http://localhost:3000/excel';

export const uploadExcel = async (formData: FormData) => {
  try {
    const res = await fetch(`${URL}/upload`, {
      method: 'POST',
      body: formData
    });

    return res.json();
  } catch (error) {
    return error;
  }
}