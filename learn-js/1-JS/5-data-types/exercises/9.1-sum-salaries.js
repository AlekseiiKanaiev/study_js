let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

function sumSal(obj){
    return Object.values(obj).reduce((a,b) => a + b, 0);
}

console.log(sumSal(salaries));

let empty = {};

console.log(sumSal(empty));