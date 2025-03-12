export interface NewMemoInterface {
    tipo: string,
    patente: string,
    rut: string,
    name: string,
    calle: string,
    numero: string,
    aclaratoria?: string,
    periodo: string,
    capital: number,
    afecto: number,
    total: number,
    emision: number,
    fechaPagos: string,
    giro: string,
    agtp: string,
    nombre_representante?: string,
    rut_representante?: string,
}

export interface Memo {
    afecto: number;
    agtp: string;
    capital: string;
    direccion: string;
    emision: number;
    giro: string;
    id: string;
    local: {
        rut_local: string;
        patente: string;
        nombre_local: string;
        representantes: {
            nombre_representante: string | null;
            rut_representante: string | null;
        } | null,
    },
    pay_times: {
        day: number;
        month: number;
        year: number;
    },
    periodo: string;
    tipo: string;
    total: string;
}

export interface InfiniteQueryInterface {
    hasNextPage: boolean;
    findMemo: Memo[];
    message: string;
    nextPage: boolean;
    totalPages: number;
    total: number;
}
