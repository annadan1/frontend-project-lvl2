import _ from 'lodash';
const replacer = ' ';
const spacesCount = 4;

const getUnionObjects = (file1, file2) => {
    const keys = _.union(_.keys(file1), _.keys(file2)).sort();
    return keys.map((key) => {
        const value1 = file1[key];
        const value2 = file2[key];
        if (_.isObject(value1) && _.isObject(value2)) {
            return {
                key, value: null, status: 'nested', children: getUnionObjects(value1, value2),
            };
        }
        if (!_.has(file1, key)) {
            return {
                key, value: value2, status: 'added', children: [],
            }
        } if (!_.has(file2, key)) {
            return {
                key, value: value1, status: 'removed', children: [],
            };
        }
        if (!_.isEqual(value1, value2)) {
            return {
                key, value: { value1, value2 }, status: 'updated', children: [],
            };
        }
        return {
            key, value: value1, status: 'unchanged', children: [],
        };
    })
};

const stringify = (object, depth = 1) => {
    const iter = (currentValue, depth) => {
        if (!_.isObject(currentValue)) {
            return `${currentValue}`;
        }
        const indentSize = depth * spacesCount;
        const currentIndent = replacer.repeat(indentSize);
        const bracketIndent = replacer.repeat(indentSize - spacesCount);
        const result = Object
            .entries(currentValue)
            .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
        return [
            '{',
            ...result,
            `${bracketIndent}}`,
        ].join('\n');
    };
    const indentSize = depth * spacesCount - 2;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - 2);

    const result = object
        .flatMap(({
            key, value, status, children
        }) => {
            if (status === 'nested') {
                return `${currentIndent}  ${key}: ${stringify(children, depth + 1)}`;
            } if (status === 'added') {
                return `${currentIndent}+ ${key}: ${iter(value, depth + 1)}`;
            } if (status === 'removed') {
                return `${currentIndent}- ${key}: ${iter(value, depth + 1)}`;
            }
            if (status === 'updated') {
                return [`${currentIndent}- ${key}: ${iter(value.value1, depth + 1)}`,
                `${currentIndent}+ ${key}: ${iter(value.value2, depth + 1)}`
                ]
            }
            return `${currentIndent}  ${key}: ${iter(value, depth + 1)}`;
        })
    return [
        '{',
        ...result,
        `${bracketIndent}}`,
    ].join('\n');
};


const stylish = (file1, file2) => {
    const unionObject = getUnionObjects(file1, file2);
    return stringify(unionObject);
};

export default stylish;