const isEmpty = require('./1.3-is-empty')

let salaries1 = {
    John : 100,
    Anna: 160,
    Pete: 30
}

let salaries2 = {}
function sumSal(obj) {
    if (!isEmpty(obj)) {
        return Object.values(obj).reduce((a, b) => a + b)
    }
    return 0;
}

console.log(sumSal(salaries1));
console.log(sumSal(salaries2));