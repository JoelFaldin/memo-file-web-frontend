import { test, expect } from '@playwright/test';

import { homeResponse } from '../placeholders/home';

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

    test('renders skeleton when loading', async ({ page }) => {
        await expect(page.getByTestId('skeleton-table')).toBeVisible();
    })

    test('renders count of each table', async ({ page }) => {
        await page.route('**/memo/overall', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(homeResponse)
            })
        })

        await expect(page.locator('td').getByText('Memorándums')).toBeVisible();
        await expect(page.locator('td').getByText('Fechas de pago')).toBeVisible();
        await expect(page.locator('td').getByText('Locales únicos')).toBeVisible();
        await expect(page.locator('td').getByText('Representantes únicos')).toBeVisible();
    });

    test('shows error notification when request fails', async ({ page }) => {
        await page.route('**/memo/overall', async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({
                    "error": "Error al obtener los datos"
                })
            })
        })

        await page.waitForTimeout(10000);
        await expect(page.getByText('Hubo un error al intentar conseguir los datos. Inténtalo más tarde.')).toBeVisible();
        await expect(page.locator('p').getByText('Ha ocurrido un error, intenta más tarde.')).toBeVisible();
    })
})
