import parse from './parse.js';
import stylish from './stylish.js'

const genDiff = (filepath1, filepath2) => {
    const parseFile1 = parse(filepath1);
    const parseFile2 = parse(filepath2);

    const diff = stylish(parseFile1, parseFile2);

    return diff;
};

export default genDiff;
