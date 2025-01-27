import { describe, expect, test } from 'vitest';

import { fixStringLength } from "@/composables/stringUtils/fixStringLength";
import { formatCurrency } from "@/composables/stringUtils/formatCurrency";
import { formatPayTime } from '@/composables/stringUtils/formatPayTime';

describe('fix string length util', () => {
    test('removes whitespaces and adds alternative title when strings length is bigger than 15', () => {
        expect(fixStringLength('This is a random direction :D').newString).toBe('This is a rando...');
        expect(fixStringLength('This is a random direction :D').fullText).toBe('This is a random direction :D');
    });

    test('doesnt affect str if string length is less than 15', () => {
        expect(fixStringLength('This is a test').newString).toBe('This is a test');
        expect(fixStringLength('This is a test').fullText).toBe('');
    })
});

describe('format currency util', () => {
    test('doesnt format 3 or less digit numbers', () => {
        expect(formatCurrency(5)).toBe('5');
        expect(formatCurrency(23)).toBe('23');
        expect(formatCurrency(456)).toBe('456');
        expect(formatCurrency(999)).toBe('999');
    })

    test('formats 4 or more digit numbers', () => {
        expect(formatCurrency(1000)).toBe('1.000');
        expect(formatCurrency(1001)).toBe('1.001');
        expect(formatCurrency(23500)).toBe('23.500');
        expect(formatCurrency(650000)).toBe('650.000');
        expect(formatCurrency(6623000)).toBe('6.623.000');
    })
});

describe('format pay time util', () => {
    test('correctly formats date given 3 numbers', () => {
        expect(formatPayTime(1, 5, 2023)).toBe('01-05-2023');
    })
})