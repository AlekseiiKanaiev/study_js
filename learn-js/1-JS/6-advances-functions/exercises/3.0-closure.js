let name = "John";

function sayHi() {
    console.log("Hi, " + name);
}

name = "Pete";

sayHi();

function makeWorker() {
    let name1 = "Pete";

    return function() {
      console.log(name1);
    };
}

let name1 = "John";
// create a function
let work = makeWorker();
work();

function makeCounter() {
    let count = 0;
  
    return function() {
      return count++; // есть доступ к внешней переменной "count"
    };
}

let counter = makeCounter();

console.log( counter() ); // 0
console.log( counter() ); // 1
console.log( counter() ); // 2

let counter1 = makeCounter();

console.log( counter1() )
console.log( counter() )

let name2 = 'Pete';

function printName(){
    console.log(name2);
}

function returnPrintName(){
    return function(){
        console.log('returned ' + name2);
    }
}

printName();
returnPrintName()();

function wrap(){
    let name2 = 'Alex';
    printName();
    let print = returnPrintName();
    print();
}

wrap();