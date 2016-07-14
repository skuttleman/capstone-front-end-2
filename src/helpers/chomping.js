export const drill = (thing, location) => {
  let locations = location.split('.');
  let key = locations.shift();
  if (locations.length) {
    return thing && drill(thing[key], locations.join('.'));
  }
  return thing && thing[key];
};

export const drillFor = (thing, location, Type) => {
   let value = drill(thing, location);
   if (value instanceof Type || typeof value === Type.name.toLowerCase()) return value;
   return new Type;
};

export const deepCopy = item => {
  if (item instanceof Array) {
    return item.map(item => deepCopy(item));
  } else if (typeof item === 'object') {
    return Object.keys(item).reduce((object, key) => {
      object[key] = deepCopy(item[key]);
      return object;
    }, {});
  } else {
    return item;
  }
};

const keyCompare = (item1, item2) => {
  let [keys1, keys2] = [item1, item2].map(Object.keys);
  keys1.sort();
  keys2.sort();
  return keys1.length === keys2.length && keys1.every((_, i) => keys1[i] === keys2[i]);
};

export const deepEquals = (item1, item2) => {
  if (item1 instanceof Object && item2 instanceof Object) {
    return keyCompare(item1, item2) && Object.keys(item1).every(key => {
      return deepEquals(item1[key], item2[key])
    });
  } else {
    return item1 === item2;
  }
};

export const listEquals = (list1, list2) => {
  return list1.length === list2.length && list1.reduce((all, item1) => {
    return all && !!list2.find(item2 => item2 === item1);
  }, true);
};
