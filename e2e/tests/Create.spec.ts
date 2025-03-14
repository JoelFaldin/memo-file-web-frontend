import { formData, wrongFormData } from '../placeholders/create';
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

        await fillLargeForm(formData);

        await page.getByRole('button').getByText('Enviar datos').click();

        await expect(page.getByText('Creando memorándum...')).toBeVisible();
        await expect(page.getByRole('button').getByText('Enviar datos')).toBeDisabled();
    });

    test('shows success notification when creating memo', async ({ page, fillLargeForm }) => {
        await page.locator('section >> [role="combobox"]').click();
        await page.locator('text=COMER').nth(1).click();

        await fillLargeForm(formData);

        await page.route('**/memo/create', async (route) => {
            await route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Memo created successfully',
                })
            })
        });
        await page.getByRole('button').getByText('Enviar datos').click();

        await expect(page.getByText('Memorándum creado con éxito!')).toBeVisible();
    });

    test('shows error notification when theres an error', async ({ page, fillLargeForm }) => {
        await page.locator('section >> [role="combobox"]').click();
        await page.locator('text=COMER').nth(1).click();

        await fillLargeForm(wrongFormData);

        await page.route('**/memo/create', async (route) => {
            await route.fulfill({
                status: 400,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Has ingresado una fecha inválida. Debe tener el formato de dd-mm-aaaa.',
                })
            })
        });

        await page.getByRole('button').getByText('Enviar datos').click();

        await expect(page.getByText('Ha ocurrido un error al crear el memorándum.')).toBeVisible();
    })
})
