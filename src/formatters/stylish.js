import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const stringify = (data, depth = 1) => {
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

    const result = data
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


const stylish = (unionObject) => {
    return stringify(unionObject);
};

export default stylish;
