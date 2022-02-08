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


describe('gendif works correctly', () => {
    describe('format stylish', () => {
        const formatName = 'stylish';
        describe('flat files', () => {
            const expectedFlat = readFileFlat(formatName, 'total.txt');
            test('with json', () => {
                const resultGenDiff = genDiff(getPathFlat(formatName, 'file1.json'), getPathFlat(formatName, 'file2.json'), formatName);
                expect(resultGenDiff).toBe(expectedFlat);
            });
            test('with yml', () => {
                const resultGenDiff = genDiff(getPathFlat(formatName, 'file1.yml'), getPathFlat(formatName, 'file2.yml'), formatName);
                expect(resultGenDiff).toBe(expectedFlat);
            });
        });
        describe('nested files', () => {
            const expectedNested = readFileNested(formatName, 'total.txt');
            test('with json', () => {
                const resultGenDiff = genDiff(getPathNested(formatName, 'file1.json'), getPathNested(formatName, 'file2.json'), formatName);
                expect(resultGenDiff).toBe(expectedNested);
            });
            test('with yml', () => {
                const resultGenDiff = genDiff(getPathNested(formatName, 'file1.yml'), getPathNested(formatName, 'file2.yml'), formatName);
                expect(resultGenDiff).toBe(expectedNested);
            });
        });
    })
    describe('format plain', () => {
        const formatName = 'plain';
        describe('flat files', () => {
            const expectedFlat = readFileFlat(formatName, 'total.txt');
            test('with json', () => {
                const resultGenDiff = genDiff(getPathFlat(formatName, 'file1.json'), getPathFlat(formatName, 'file2.json'), formatName);
                expect(resultGenDiff).toBe(expectedFlat);
            });
            test('with yml', () => {
                const resultGenDiff = genDiff(getPathFlat(formatName, 'file1.yml'), getPathFlat(formatName, 'file2.yml'), formatName);
                expect(resultGenDiff).toBe(expectedFlat);
            });
        });
        describe('nested files', () => {
            const expectedNested = readFileNested(formatName, 'total.txt');
            test('with json', () => {
                const resultGenDiff = genDiff(getPathNested(formatName, 'file1.json'), getPathNested(formatName, 'file2.json'), formatName);
                expect(resultGenDiff).toBe(expectedNested);
            });
            test('with yml', () => {
                const resultGenDiff = genDiff(getPathNested(formatName, 'file1.yml'), getPathNested(formatName, 'file2.yml'), formatName);
                expect(resultGenDiff).toBe(expectedNested);
            });
        });
    })
});
