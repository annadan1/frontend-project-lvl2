import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import process from 'process';

const parse = (filepath) => {
  const file = fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
  const format = path.extname(filepath);
  switch (format) {
    case '.json':
      return JSON.parse(file);
    case '.yml':
    case '.yaml':
      return yaml.load(file);
    default:
      throw new Error('format unknow');
  }
};

export default parse;
