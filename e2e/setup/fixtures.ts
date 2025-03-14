import { test as base } from '@playwright/test';

interface FormFillInterface {
    fillLargeForm: (fillForm) => void;
}

export const test = base.extend<FormFillInterface>({
    fillLargeForm: async ({ page }, use) => {
        const fillForm = async (data: {
            patente: string,
            rut: string,
            name: string,
            calle: string,
            numero: string,
            periodo: string,
            capital: number,
            afecto: number,
            total: number,
            emision: number,
            fechaPagos: string,
            giro: string,
            agtp: string,
        }) => {
            await page.locator('[name="rut"]').fill(data.rut);
            await page.locator('[name="name"]').fill(data.name);
            await page.locator('[name="patente"]').fill(data.patente);
            await page.locator('[name="periodo"]').fill(data.periodo);
            await page.locator('[name="calle"]').fill(data.calle);
            await page.locator('[name="numero"]').fill(data.numero);
            await page.locator('[name="capital"]').fill(data.capital.toString());
            await page.locator('[name="afecto"]').fill(data.afecto.toString());
            await page.locator('[name="total"]').fill(data.total.toString());
            await page.locator('[name="emision"]').fill(data.emision.toString());
            await page.locator('[name="fechaPagos"]').fill(data.fechaPagos);
            await page.locator('[name="giro"]').fill(data.giro);
            await page.locator('[name="agtp"]').fill(data.agtp);
        }

        await use(fillForm);
    }
})

export { expect } from '@playwright/test';
