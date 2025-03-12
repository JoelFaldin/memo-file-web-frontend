import { z, ZodError } from 'zod';

import type { NewMemoInterface } from '@/interfaces/memoInterface';

const formSchema = z.object({
    rut: z.string().min(9, { message: 'Debes indicar el rut del local!' }),
    name: z.string().min(3, { message: 'Debes indicar el nombre del local!' }),
    tipo: z.enum(["COMER", "PROFE", "INDUS", "ALCOH", "MEF"], { message: 'Debes indicar un tipo de patente válido.' }),
    patente: z.string().min(1, { message: 'Debes ingresar una patente.' }),
    periodo: z.string().min(1, { message: 'Debes ingresar un período.' }),
    calle: z.string().min(3, { message: 'Debes ingresar una calle.' }),
    numero: z.string().min(1, { message: 'Debes ingresar un número.' }),
    aclaratoria: z.string().optional(),
    capital: z.number().min(0, { message: 'Debes ingresar un capital válido.' }),
    afecto: z.number().min(0, { message: 'Debes ingresar un monto afecto válido.' }),
    total: z.number().min(0, { message: 'Debes ingresar un monto total válido.' }),
    emision: z.number().min(0, { message: 'Debes ingresar un monto de emisión válido.' }),
    fechaPagos: z.string().min(1, { message: 'Debes ingresar una fecha de pago.' }),
    giro: z.string().min(3, { message: 'Debes ingresar un giro.' }),
    agtp: z.string().min(0, { message: 'Debes ingresar un agtp.' }),
    nombreRepresentante: z.string().optional(),
    rutRepresentante: z.string().optional(),
});

export const parseForm = (form: NewMemoInterface): | { success: true, data: NewMemoInterface } | { success: false, error: ZodError } => {
    try {
        const data = formSchema.parse(form);
        return { success: true, data };
    } catch (error) {
        if (error instanceof ZodError) {
            return { success: false, error };
        }

        throw error;
    }
}
