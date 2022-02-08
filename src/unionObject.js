import _ from 'lodash';

const unionObjects = (file1, file2) => {
  const keys = _.union(_.keys(file1), _.keys(file2));
  const sortedKeys = [...keys].sort();
  return sortedKeys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key, value: null, status: 'nested', children: unionObjects(value1, value2),
      };
    }
    if (!_.has(file1, key)) {
      return {
        key, value: value2, status: 'added', children: [],
      };
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
  });
};

export default unionObjects;
