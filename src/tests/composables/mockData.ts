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
            "label": "Usuarios únicos",
            "count": 8,
        },
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