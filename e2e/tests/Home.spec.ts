import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173');
    })

    test('has title', async ({ page }) => {
        await expect(page).toHaveTitle(/Memorandum Files web/);
    });

    test('renders heading and description', async ({ page }) => {
        await expect(page.locator('h3')).toHaveText('Resumen general');
        await expect(page.locator('p')).toHaveText('Lista de memorándums 2010-2024');
    });

    test('renders count of each table', async ({ page }) => {
        await expect(page.locator('td').getByText('Memorándums')).toBeVisible();
        await expect(page.locator('td').getByText('Fechas de pago')).toBeVisible();
        await expect(page.locator('td').getByText('Locales únicos')).toBeVisible();
        await expect(page.locator('td').getByText('Representantes únicos')).toBeVisible();
    })
})
