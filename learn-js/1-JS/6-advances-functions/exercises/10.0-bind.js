'use strict'

let user = {
    name: 'ALex',
    say(){
        console.log(this.name);
    }
}

setTimeout(user.say, 1000); //undefined

//equalent

let f = user.say;

setTimeout(f, 1000); //undefined

// это происходит из-за потери контекста user

// Solution #1

//use wrapper function
setTimeout(() => user.say(), 1000);

// но теперь в коде появилась небольшая уязвимость: если в переменную `user` будет записано другое значение, тогда вызов будет совсем не тот!

user.say = () => console.log('another call');

// solution #2

// привязать контекст с помощью bind

function func(){
    console.log(this.name);
}

// func(); //error
let funcUser = func.bind(user);
funcUser(); // Alex

let sayHi = user.say.bind(user);

sayHi();
setTimeout(sayHi, 1000);

user.sayPhrase = (phrase) => console.log(phrase + ', Alex');

let sayBye = user.sayPhrase.bind(user);

sayBye('Bye');
setTimeout(sayBye, 1000, 'Hello');

user.sayPhrase = (phrase) => console.log(phrase + ', John');

sayBye('Bye'); //doesn't change context after changing function

//частичное применение

function getRandom(min, max){
    return Math.floor(Math.random()*(max-min)+min);
}

// let counts = [];
// counts.length = 6;
// counts.fill(0);
// console.log(counts);
// for(let i = 0; i < 100000; i++){
//     counts[getRandom(1,6)-1]++;
// }
// console.log(counts);

let dice = getRandom.bind(null, 1);

console.log(dice(6));
console.log(dice(10));
