import { test, expect } from '@playwright/test';

test.describe('SideBar', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173');
    })

    test('is visible', async ({ page }) => {
        await expect(page.locator('h1')).toHaveText('Bienvenido');

        await expect(page.locator('button').getByText('Inicio')).toBeVisible();
        await expect(page.locator('button').getByText('Buscar memorándums')).toBeVisible();
        await expect(page.locator('button').getByText('Crear memorándum')).toBeVisible();
        await expect(page.locator('button').getByText('Subir excel')).toBeVisible();

        await expect(page.getByTestId('theme-toggle')).toBeVisible();
    });

    test('button theme can change theme', async ({ page }) => {
        await page.getByTestId('theme-toggle').click();

        await page.getByText('Oscuro').click();
        await expect(page.locator('section').first().evaluate((el) => el.classList.contains('bgSectionDark'))).resolves.toBeTruthy();

        await page.getByTestId('theme-toggle').click();
        await page.getByText('Claro').click();
        await expect(page.locator('section').first().evaluate((el) => el.classList.contains('bgSectionLight'))).resolves.toBeTruthy();
    })

    test('can navigate to Home', async ({ page }) => {
        await page.click('button:has-text("Inicio")');

        await expect(page.locator('h3')).toHaveText('Resumen general');
        await expect(page.locator('p')).toHaveText('Lista de memorándums 2010-2024');
    });

    test('can navigate to search page', async ({ page }) => {
        await page.click('button:has-text("Buscar memorándums")');

        await expect(page.getByText('Buscar por rol (patente):')).toBeVisible();
        await expect(page.getByText('Buscar por rut:')).toBeVisible();
        await expect(page.getByText('Buscar por dirección:')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Buscar', exact: true })).toBeVisible();
        await expect(page.locator('label').getByText('Scroll infinito')).toBeVisible();
    });

    test('can navigate to create page', async ({ page }) => {
        await page.click('button:has-text("Crear memorándum")');

        await expect(page.locator('h3')).toHaveText('Guardar un nuevo memorándum');
        await expect(page.getByText('Rut del local')).toBeVisible();
        await expect(page.getByText('Nombre del local (nombre de fantasía)')).toBeVisible();
        await expect(page.getByText('Tipo de patente', { exact: true })).toBeVisible();
        await expect(page.getByText('Patente', { exact: true })).toBeVisible();
        await expect(page.getByText('Periodo')).toBeVisible();
        await expect(page.getByText('Calle')).toBeVisible();
        await expect(page.getByText('Número')).toBeVisible();
        await expect(page.getByText('Aclaratoria')).toBeVisible();
        await expect(page.getByText('Capital')).toBeVisible();
        await expect(page.getByText('Afecto')).toBeVisible();
        await expect(page.getByText('Total')).toBeVisible();
        await expect(page.getByText('Emisión')).toBeVisible();
        await expect(page.getByText('Fecha de pago')).toBeVisible();
        await expect(page.getByText('Giro')).toBeVisible();
        await expect(page.getByText('AGTP')).toBeVisible();
        await expect(page.getByText('Nombre del representante')).toBeVisible();
        await expect(page.getByText('Rut del representante')).toBeVisible();
        await expect(page.locator('button').getByText('Enviar datos')).toBeVisible();
    });

    test('can navigate to excel page', async ({ page }) => {
        await page.click('button:has-text("Subir excel")');

        await expect(page.locator('h1').getByText('Subir archivo excel')).toBeVisible();
        await expect(page.locator('p').getByText('Importante: el formato de fecha es 20201201 (yyyy-mm-dd)!')).toBeVisible();
        await expect(page.getByTestId('excel-upload-button')).toBeVisible();

        await expect(page.locator('h2').getByText('Descarga la plantilla')).toBeVisible();
        await expect(page.locator('p').getByText('Asegúrate de que la información esté correctamente formateada para guardarla en la base de datos!')).toBeVisible();
        await expect(page.locator('button').getByText('Descargar plantilla')).toBeVisible();

        await expect(page.locator('h2').getByText('Descargar excel con memos')).toBeVisible();
        await expect(page.locator('p').getByText('Ésta acción descargará en tu equipo un archivo excel que contiene todos los datos de la base de datos!')).toBeVisible();
        await expect(page.locator('button').getByText('Descargar excel')).toBeVisible();
    })
})
