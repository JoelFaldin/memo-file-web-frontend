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
    })
})
