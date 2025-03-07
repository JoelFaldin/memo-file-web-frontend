const URL = `${import.meta.env.VITE_BACKEND_URL}/excel`;

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
    throw error;
  }
}

export const downloadExcelTemplate = async () => {
  try {
    const res = await fetch(`${URL}/`);

    if (!res.ok) {
      throw new Error('Ha ocurrido un problema, inténtalo más tarde.');
    }

    const blob = new Blob([await res.blob()], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const anchor = document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = 'excel_template.xlsx';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    return res.blob;
  } catch(error) {
    throw error;
  }
}

export const downloadExcelData = async () => {
  try {
    const res = await fetch(`${URL}/data`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error('Ha ocurrido un problema, inténtalo más tarde.');
    }

    const blob = await res.blob();
    const location = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = location;
    a.download = 'memos.xlsx';
    a.click();

    window.URL.revokeObjectURL(location);
  } catch (error) {
    throw error;
  }
}
