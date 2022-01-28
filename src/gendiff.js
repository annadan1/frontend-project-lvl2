import _ from 'lodash';
import * as fs from 'fs';
import * as path from 'path';

const parse = (filepath) => {
    // eslint-disable-next-line no-undef
    const file = fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
    return JSON.parse(file);
};

const genDiff = (filepath1, filepath2) => {
    const parseFile1 = parse(filepath1);
    const parseFile2 = parse(filepath2);

    const keys = _.union(_.keys(parseFile1), _.keys(parseFile2)).sort();

    let diff = {};

    keys.forEach((key) => {
        if (parseFile1[key] === parseFile2[key]) {
            diff[`  ${key}`] = parseFile1[key];
        } else if (parseFile1[key] !== parseFile2[key]) {
            diff[`- ${key}`] = parseFile1[key];
            diff[`+ ${key}`] = parseFile2[key];
        } else if (!_.has(parseFile1, key) && _.has(parseFile2, key)) {
            diff[`+ ${key}`] = parseFile2[key];
        } else if (_.has(parseFile1, key) && !_.has(parseFile2, key)) {
            diff[`- ${key}`] = parseFile1[key];
        }
    })
    diff = JSON.stringify(diff, null, 2);
    return diff.replace(/"/g, '').replace(/,/g, '');
};

export default genDiff;