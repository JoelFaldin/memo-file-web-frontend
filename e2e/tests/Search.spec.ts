import { test, expect } from '@playwright/test';

import { searchResponse } from '../placeholders/search';

test.describe('Search page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/search');
    })

    test('shows warning notification when no search params', async ({ page }) => {
        await page.getByRole('button', { name: 'Buscar', exact: true }).click();

        await expect(page.getByText('Debes indicar un rol, rut o dirección para buscar!')).toBeVisible();
    });

    test('shows loading notification when loading', async ({ page }) => {
        await page.fill('input[name="rol"]', '400111-1');
        await page.getByRole('button', { name: 'Buscar', exact: true }).click();

        await expect(page.getByText('Buscando memorándums...')).toBeVisible();
    })

    test('can search by rol', async ({ page }) => {
        await page.fill('input[name="rol"]', '400111-1');
        await page.getByRole('button', { name: 'Buscar', exact: true }).click();

        await page.route('**/memo/find?rol=400111-1&rut=&direction=&page=1&limit=10', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(searchResponse)
            });
        });

        await expect(page.getByText('400111-1')).toBeVisible();
        await expect(page.getByText('Memorándums encontrados!')).toBeVisible();
    });

    test('can search by rut', async ({ page }) => {
        await page.fill('input[name="rut"]', '11.111.111-1');
        await page.getByRole('button', { name: 'Buscar', exact: true }).click();

        await page.route('**/memo/find?rol=&rut=11111111-1&direction=&page=1&limit=10', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(searchResponse)
            });
        });

        await expect(page.getByText('400111-1')).toBeVisible();
        await expect(page.getByText('Memorándums encontrados!')).toBeVisible();
    });

    test('can search by direction', async ({ page }) => {
        await page.fill('input[name="direction"]', 'random');
        await page.getByRole('button', { name: 'Buscar', exact: true }).click();

        await page.route('**/memo/find?rol=&rut=&direction=random&page=1&limit=10', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(searchResponse)
            });
        });

        await expect(page.getByText('400111-1')).toBeVisible();
        await expect(page.getByText('Memorándums encontrados!')).toBeVisible();
    });

    test('shows error notification when no results', async ({ page }) => {
        await page.fill('input[name="rol"]', 'wrong');
        await page.getByRole('button', { name: 'Buscar', exact: true }).click();

        await page.route('**/memo/find?rol=wrong&rut=&direction=&page=1&limit=10', async (route) => {
            await route.fulfill({
                status: 400,
                contentType: 'application/json',
                body: JSON.stringify({
                    "statusCode": 400,
                    "message": "No se ha encontrado ningún memo con los datos ingresados."
                })
            });
        });

        await page.waitForTimeout(10000);
        await expect(page.getByText('Ha ocurrido un error al intentar buscar los memorándums. Inténtalo más tarde.')).toBeVisible();
    })
})
