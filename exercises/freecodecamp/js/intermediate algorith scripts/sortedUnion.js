function uniteUnique(arr) {
    return [...new Set(arr.concat(...arguments))]
  }
  
let a = uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);
let b = uniteUnique([1, 3, 2], [1, [5]], [2, [4]]);
console.log(a);
console.log(b);