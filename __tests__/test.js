/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import genDiff from '../src/gendiff.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPath = (filepath) => path.join(__dirname, '..', '__fixtures__', filepath);
const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'utf-8');

describe('gendiff works correctly', () => {
    test('with json', () => {
        const resultGenDiff = genDiff(getPath('file1.json'), getPath('file2.json'));
        const expected = readFile('totaljson.txt');
        expect(resultGenDiff).toBe(expected);
    });
    test('with yml', () => {
        const resultGenDiff = genDiff(getPath('file1.yml'), getPath('file2.yml'));
        const expected = readFile('totalyml.txt');
        expect(resultGenDiff).toBe(expected);
    });
});
