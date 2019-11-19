function f() {
    console.log("Hello!");
}

Function.prototype.defer = function(ms){
    setTimeout(this, ms);
}

// f.defer(1000);

function sum(a, b) {
    console.log( a + b );
}
  
Function.prototype.defer2 = function(ms){
    let f = this; //save this like function
    return function(...args) {
        setTimeout(f, ms, ...args)
    }
}

sum.defer2(1000)(1, 2);