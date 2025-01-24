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

export const downloadExcelTemplate = async () => {
  try {
    const res = await fetch(`${URL}/`)

    const blob = new Blob([await res.blob()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = 'excel_template.xlsx';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    return res.blob;
  } catch(error) {
    console.log(error);
    return Promise.reject(error);
  }
}