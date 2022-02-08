import _ from 'lodash';

const getValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const plain = (data) => {
  const iter = (currentObj, path = '') => currentObj
    .flatMap(({
      key, value, status, children,
    }) => {
      const currentPath = ([...path, key]);
      const jointPath = currentPath.join('.');
      if (status === 'removed') {
        return `Property '${jointPath}' was removed`;
      } if (status === 'added') {
        return `Property '${jointPath}' was added with value: ${getValue(value)}`;
      } if (status === 'updated') {
        return `Property '${jointPath}' was updated. From ${getValue(value.value1)} to ${getValue(value.value2)}`;
      } if (status === 'nested') {
        return iter(children, currentPath);
      }
      return 'null';
    });
  const result = iter(data);
  return result.filter((str) => str !== 'null').join('\n');
};

export default plain;
