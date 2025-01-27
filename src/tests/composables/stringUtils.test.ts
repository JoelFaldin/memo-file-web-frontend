import { fixStringLength } from "@/composables/stringUtils/fixStringLength";
import { describe, expect, test } from 'vitest';

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
