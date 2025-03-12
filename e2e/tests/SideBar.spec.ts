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
})
