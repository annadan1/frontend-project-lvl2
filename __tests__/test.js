/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathFlat = (formatName, filepath) => path.join(__dirname, '..', '__fixtures__', formatName, 'flat', filepath);
const readFileFlat = (formatName, filepath) => fs.readFileSync(getPathFlat(formatName, filepath), 'utf-8');

const getPathNested = (formatName, filepath) => path.join(__dirname, '..', '__fixtures__', formatName, 'nested', filepath);
const readFileNested = (formatName, filepath) => fs.readFileSync(getPathNested(formatName, filepath), 'utf-8');

const resultGenDiffFlat = (file1, file2, formatName) => {
    return genDiff(getPathFlat(formatName, file1), getPathFlat(formatName, file2), formatName)
};
const resultGenDiffNested = (file1, file2, formatName) => {
    return genDiff(getPathNested(formatName, file1), getPathNested(formatName, file2), formatName)
};

describe('gendif works correctly', () => {
    describe('format stylish', () => {
        const formatName = 'stylish';
        describe('flat files', () => {
            const expectedFlat = readFileFlat(formatName, 'total.txt');
            test('with json', () => {
                const test = resultGenDiffFlat('file1.json', 'file2.json', formatName);
                expect(test).toBe(expectedFlat);
            });
            test('with yml', () => {
                const test = resultGenDiffFlat('file1.yml', 'file2.yml', formatName);
                expect(test).toBe(expectedFlat);
            });
        });
        describe('nested files', () => {
            const expectedNested = readFileNested(formatName, 'total.txt');
            test('with json', () => {
                const test = resultGenDiffNested('file1.json', 'file2.json', formatName);
                expect(test).toBe(expectedNested);
            });
            test('with yml', () => {
                const test = resultGenDiffNested('file1.yml', 'file2.yml', formatName);
                expect(test).toBe(expectedNested);
            });
        });
    })
    describe('format plain', () => {
        const formatName = 'plain';
        describe('flat files', () => {
            const expectedFlat = readFileFlat(formatName, 'total.txt');
            test('with json', () => {
                const test = resultGenDiffFlat('file1.json', 'file2.json', formatName);
                expect(test).toBe(expectedFlat);
            });
            test('with yml', () => {
                const test = resultGenDiffFlat('file1.yml', 'file2.yml', formatName);
                expect(test).toBe(expectedFlat);
            });
        });
        describe('nested files', () => {
            const expectedNested = readFileNested(formatName, 'total.txt');
            test('with json', () => {
                const test = resultGenDiffNested('file1.json', 'file2.json', formatName);
                expect(test).toBe(expectedNested);
            });
            test('with yml', () => {
                const test = resultGenDiffNested('file1.yml', 'file2.yml', formatName);
                expect(test).toBe(expectedNested);
            });
        });
    })
});
