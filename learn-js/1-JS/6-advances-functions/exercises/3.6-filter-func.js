function inBetween(a, b){
    return function(value){
        return (a <= value && b >= value)
    }
}

function inArray(arr){
    return function(value){
        return arr.includes(value);
    }
}

let arr = [1, 2, 3, 4, 5, 6, 7];

console.log(arr.filter(inBetween(2, 4)));
console.log(arr.filter(inArray([1, 2, 3, 10])));

function sortByField(fieldName){
    return function(a, b){
        return a[fieldName] > b[fieldName];
    }
}

let users = [
    { name: "John", age: 20, surname: "Johnson" },
    { name: "Pete", age: 18, surname: "Peterson" },
    { name: "Ann", age: 19, surname: "Hathaway" }
];

// console.log(users.sort((a, b) => a.name > b.name));
console.log(users.sort(sortByField('name')));
console.log(users.sort(sortByField('age')));