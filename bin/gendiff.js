#!/usr/bin/env node

import program from 'commander';
import genDiff from '../src/gendiff.js';
import process from 'process';

program
    .version('0.1')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format', 'stylish')
    .action((filepath1, filepath2) => {
        const diff = genDiff(filepath1, filepath2, program.format);
        console.log(diff)
    });
program.parse(process.argv);
