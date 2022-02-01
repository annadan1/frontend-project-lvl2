import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (filepath) => {
    // eslint-disable-next-line no-undef
    const file = fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
    const format = path.extname(filepath);
    if (format === '.json') {
        return JSON.parse(file);
    } else if (format === '.yml' || format === '.yaml') {
        return yaml.load(file);
    }
};
export default parse;
