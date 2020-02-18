'use strict'
function f(p) {
    console.log(arguments)
    this.p = p;
    let a = 5;
}
// let d = new f(1);
let a = [];
let b = [];
// console.log(!a);
const o = {}
let y = 2
let x = '3'
// x = (x++, x -= 1, x += 2);
let tr = 'asdasda'
console.log(x+++2);
let c = Array();
console.log(c.length);
// function my(){
//     let a = b = 33;
// }
// my();
// console.log(!['a'] );
// f.apply(null, [1, 2, 3, 4])
const myObj = {
    func(){
        function myName(){
            console.log(this.name);
        }
        myName();
    },
    name: 'Alex',
    anoying(callback){
        callback();
    }
}

// myObj.func()
// myObj.anoying(function(){console.log(this)})

// (function(){
//     console.log(this)
// })();
function f1(n){
    if(n & 1){
        return false;
    } else {
        return true;
    }
}
// console.log(f1(103));

var name = 'Alex';
var getName = name;

// console.log(window.getName);
// console.log(this.getName);

