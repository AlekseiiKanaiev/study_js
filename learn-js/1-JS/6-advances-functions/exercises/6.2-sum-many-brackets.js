function sumClosure(a){
    let count = a;
    return function next(b){
        if (b === undefined) return count;
        else {
            count += b;
            return next;
        }
    }
}

//we need extra call here
console.log(sumClosure(1)(2)(4)(5)());

//another methid is to use toString or valueOf in-built method
function f(a){
    return a;
}
console.log(f.toString());
console.log(f('return: ' + 1));

function sum(a){
    let sum = a;
    function next(b){
        sum += b
        return next;
    }
    next.toString = () => sum;
    return next;
}

function add(x) {
    function next(y) {
      return add(x + y);
    }
    next.valueOf = () => x;
    return next;
}
console.log(sum(2)(2)(4)(5));
console.log(sum(2)(2)(4)(5) == 13);
console.log(+sum(2)(2)(4)(5));
console.log(sum(2)(2)(4)(5).toString());
console.log(add(2)(2)(4)(10));
console.log(add(2)(2)(4)(10) == 18);
console.log(+add(2)(2)(4)(10));
console.log(+add(2)(2)(4)(10).valueOf());
