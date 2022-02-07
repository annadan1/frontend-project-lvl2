import parse from './parse.js';
import stylish from './stylish.js'

const genDiff = (filepath1, filepath2) => {
    const parseFile1 = parse(filepath1);
    const parseFile2 = parse(filepath2);

    const diff = stylish(parseFile1, parseFile2);

    return diff;
};

export default genDiff;

//console.log(genDiff('../__fixtures__/plain/file1.json', '../__fixtures__/plain/file2.json'))
//console.log(genDiff('../__fixtures__/nested/file1.json', '../__fixtures__/nested/file2.json'))
