import parse from './parse.js';
import getUnionObject from './unionObject.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const parseFile1 = parse(filepath1);
  const parseFile2 = parse(filepath2);
  const unionObject = getUnionObject(parseFile1, parseFile2);

  const diff = format(unionObject, formatName);

  return diff;
};

export default genDiff;
