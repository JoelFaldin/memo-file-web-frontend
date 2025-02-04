export const mockOverallResponse = {
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
            "label": "Locales únicos",
            "count": 8,
        },
        {
          "label": "Representantes únicos",
          "count": "5"
        }
    ]
};

export const mockSearchMemosResponse = {
    "value": {
        "message": "Memos encontrados!",
        "findMemo": [
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
}

export const mockMultiplePageSearchMemo = {
    "value": {
        "message": "Memos encontrados!",
        "findMemo": [
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
        "nextPage": true,
        "totalPages": 2
    }
}

export const mockErrorReturnSearchMemo = {
  "value": {
    "statusCode": 400,
    "message": "No se ha encontrado ningún memo con los datos ingresados.",
  }
}

export const mockInputCreateMemo = {
  "userInputs": {
    "rut": "1000000-7",
    "nombre": "Test",
  },
  "infoInputs": {
    "tipo": "ALCOHO",
    "patente": "400111-1",
    "periodo": "20251S"
  },
  "directionInputs": {
    "calle": "Chile",
    "numero": "23",
    "aclaratoria": "",
  },
  "financesInputs": {
    "capital": "100000",
    "afecto": "0",
    "total": "100000",
    "emision": "string",
  },
  "labelInputs": {
    "fechaPagos": "01-02-2025",
    "giro": "ABOGADO",
    "agtp": "0",
  },
  "representantInputs": {
    "nombre": "Test Rep",
    "rut": "11.111.111-1"
  }
}

export const mockCreateMemoSuccess = {
  "value": {
    "message": "Memorándum creado con éxito!"
  }
}
