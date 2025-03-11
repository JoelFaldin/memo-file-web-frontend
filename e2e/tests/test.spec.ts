import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
    test('has title', async ({ page }) => {
        await page.goto('http://localhost:5173');

        await expect(page).toHaveTitle(/Memorandum Files web/);
    });

    test('renders heading and description', async ({ page }) => {
        await page.goto('http://localhost:5173');

        await expect(page.locator('h3')).toHaveText('Resumen general');
        await expect(page.locator('p')).toHaveText('Lista de memorándums 2010-2024');
    });
})
