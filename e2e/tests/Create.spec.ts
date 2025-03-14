import { test, expect } from '../setup/fixtures';

test.describe('Create memo page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/create');
    })

    test('shows warning when submitting with no data', async ({ page }) => {
        await page.getByRole('button').getByText('Enviar datos').click();

        await expect(page.getByText('Por favor, revisa los campos marcados en rojo.')).toBeVisible();
    });

    test('show red errors when submitting with no data', async ({ page }) => {
        await page.getByRole('button').getByText('Enviar datos').click();

        await expect(page.getByRole('paragraph').getByText('Debes indicar el rut del local!')).toBeVisible();
        await expect(page.getByRole('paragraph').getByText('Debes indicar el nombre del local!')).toBeVisible();
        await expect(page.getByRole('paragraph').getByText('Debes indicar un tipo de patente válido.')).toBeVisible();
        await expect(page.getByRole('paragraph').getByText('Debes ingresar una patente.')).toBeVisible();
        await expect(page.getByRole('paragraph').getByText('Debes ingresar una calle.')).toBeVisible();
        await expect(page.getByRole('paragraph').getByText('Debes ingresar un número.')).toBeVisible();
        await expect(page.getByRole('paragraph').getByText('Debes ingresar un capital válido.')).toBeVisible();
        await expect(page.getByRole('paragraph').getByText('Debes ingresar un monto afecto válido.')).toBeVisible();
        await expect(page.getByRole('paragraph').getByText('Debes ingresar un monto total válido.')).toBeVisible();
        await expect(page.getByRole('paragraph').getByText('Debes ingresar un monto de emisión válido.')).toBeVisible();
        await expect(page.getByRole('paragraph').getByText('Debes ingresar una fecha de pago.')).toBeVisible();
        await expect(page.getByRole('paragraph').getByText('Debes ingresar un giro.')).toBeVisible();
    });

    test('shows loading notification when loading', async ({ page, fillLargeForm }) => {
        await page.locator('section >> [role="combobox"]').click();
        await page.locator('text=COMER').nth(1).click();

        await fillLargeForm({
            patente: '400111-1',
            rut: '11.111.111-1',
            name: 'test',
            calle: 'test',
            numero: '3000',
            periodo: '20251S',
            capital: '100.000',
            afecto: '0',
            total: '100.000',
            emision: '0',
            fechaPagos: '01-02-2025',
            giro: 'ABOGADO',
            agtp: '0',
        });

        await page.getByRole('button').getByText('Enviar datos').click();

        await expect(page.getByText('Creando memorándum...')).toBeVisible();
        await expect(page.getByRole('button').getByText('Enviar datos')).toBeDisabled();
    })
})
