import { test, expect } from '@playwright/test';

import { homeResponseAfterUpload } from '../placeholders/home';

test.describe('Excel page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/excel');
    });

    test('shows warning when trying to upload without attaching a file', async ({ page }) => {
        await page.getByTestId('upload-excel').click();

        await expect(page.getByText('Debes seleccionar un archivo excel!')).toBeVisible();
    });

    test('can upload excel file', async ({ page }) => {
        const mockExcel = 'e2e/files/excel_mock_data.xlsx';

        await page.locator('input[type="file"]').setInputFiles(mockExcel);
        await expect(page.getByText('excel_mock_data.xlsx')).toBeVisible();

        await page.route('**/excel/upload', async (route) => {
            await route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Excel subido correctamente.',
                })
            })
        });

        await page.getByTestId('upload-excel').click();
        await expect(page.getByText('Datos subidos exitosamente!')).toBeVisible();

        await page.route('**/memo/overall', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(homeResponseAfterUpload)
            })
        })

        await page.getByText('Inicio').click();
        const row1 = page.locator('tr', { hasText: 'Memorándums' });
        const row2 = page.locator('tr', { hasText: 'Fechas de pago' });
        const row3 = page.locator('tr', { hasText: 'Locales únicos' });
        const row4 = page.locator('tr', { hasText: 'Representantes únicos' });

        await expect(row1.locator('td').nth(0)).toHaveText('10');
        await expect(row2.locator('td').nth(0)).toHaveText('10');
        await expect(row3.locator('td').nth(0)).toHaveText('10');
        await expect(row4.locator('td').nth(0)).toHaveText('0');
    })

    test('shows error when error ocurrs', async ({ page }) => {
        const mockExcel = 'e2e/files/excel_mock_data.xlsx';

        await page.locator('input[type="file"]').setInputFiles(mockExcel);
        await expect(page.getByText('excel_mock_data.xlsx')).toBeVisible();

        await page.route('**/excel/upload', async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Ha ocurrido un error. Inténtalo más tarde.',
                })
            })
        });

        await page.getByTestId('upload-excel').click();
        await expect(page.getByText('Ha ocurrido un error al subir el archivo excel.')).toBeVisible();
    })

    test('can download excel template', async ({ page }) => {
        await page.route('**/excel/', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/octet-stream',
                headers: {
                    'Content-Disposition': 'attachment; filename="excel_template.xlsx"',
                },
                body: 'Mock excel content'
            })
        });

        await page.getByTestId('download-template').click();

        await expect(page.getByText('Plantilla descargada!')).toBeVisible();
    });

    test('shows error if theres error on template', async ({ page }) => {
        await page.route('**/excel/', async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Ha ocurrido un error intentando descargar la plantilla, inténtalo más tarde.',
                }),
            })
        });

        await page.getByTestId('download-template').click();
        await page.waitForTimeout(10000);

        await expect(page.getByText('Ha ocurrido un error al intentar descargar la plantilla. Inténtalo nuevamente.')).toBeVisible();
    });

    test('can download excel with data', async ({ page }) => {
        await page.route('**/excel/data', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/octet-stream',
                headers: {
                    'Content-Disposition': 'attachment; filename="excel_template.xlsx"',
                },
                body: 'Mock excel content'
            })
        });

        await page.getByTestId('download-excel-data').click();

        await expect(page.getByText('Excel con memorándums descargado con éxito!')).toBeVisible();
    });

    test('shows error if theres any error on excel with data', async ({ page }) => {
        await page.route('**/excel/data', async (route) => {
            await route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({
                    message: 'Ha ocurrido un error intentando descargar el excel con datos, inténtalo más tarde.',
                }),
            })
        });

        await page.getByTestId('download-excel-data').click();
        await page.waitForTimeout(10000);

        await expect(page.getByText('Ha ocurrido un error al intentar descargar el archivo. Revisa tu conexión e inténtalo más tarde.')).toBeVisible();
    });
});
