function sortByAge(arr){
    return arr.slice().sort((a, b) => a.age > b.age)
}

let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let arr = [ vasya, petya, masha ];

let a = sortByAge(arr);
console.log(a);