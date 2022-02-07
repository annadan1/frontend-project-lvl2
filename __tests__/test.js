/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathPlain = (filepath) => path.join(__dirname, '..', '__fixtures__', 'stylish', 'plain', filepath);
const readFilePlain = (filepath) => fs.readFileSync(getPathPlain(filepath), 'utf-8');

const getPathNested = (filepath) => path.join(__dirname, '..', '__fixtures__', 'stylish', 'nested', filepath);
const readFileNested = (filepath) => fs.readFileSync(getPathNested(filepath), 'utf-8');


describe('gendif works correctly (format stylish)', () => {
    describe('plain files', () => {
        const expectedPlain = readFilePlain('total.txt');
        test('with json', () => {
            const resultGenDiff = genDiff(getPathPlain('file1.json'), getPathPlain('file2.json'));
            expect(resultGenDiff).toBe(expectedPlain);
        });
        test('with yml', () => {
            const resultGenDiff = genDiff(getPathPlain('file1.yml'), getPathPlain('file2.yml'));
            expect(resultGenDiff).toBe(expectedPlain);
        });
    });
    describe('nested files', () => {
        const expectedNested = readFileNested('total.txt');
        test('with json', () => {
            const resultGenDiff = genDiff(getPathNested('file1.json'), getPathNested('file2.json'));
            expect(resultGenDiff).toBe(expectedNested);
        });
        test('with yml', () => {
            const resultGenDiff = genDiff(getPathNested('file1.yml'), getPathNested('file2.yml'));
            expect(resultGenDiff).toBe(expectedNested);
        });
    });
});
