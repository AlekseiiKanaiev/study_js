let map = new Map();

map.set('name', 'John');

let keys = map.keys();

// Error: keys.push is not a function
// Ошибка: keys.push -- это не функция
// keys.push("more");

console.log(keys);

console.log(Array.isArray(keys));

arrKeys = [...map.keys()];

console.log(Array.isArray(arrKeys));

arrKeys.push('more');

console.log(arrKeys);

arrKeys2 = Array.from(map.keys());

arrKeys2.push('more');

console.log(arrKeys2);