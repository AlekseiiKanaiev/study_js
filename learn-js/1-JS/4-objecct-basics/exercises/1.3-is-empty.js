'use strict';

function isEmpty(obj) {
    return (Object.keys(obj).length)? false : true;
}

module.exports = isEmpty;
// let a = {}
// let b = {'a': 12}
// console.log(isEmpty(a));
// console.log(isEmpty(b));