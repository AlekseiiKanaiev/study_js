function adder(a, b){
    return a+b;
}

// let promise = new Promise(function(resolve, reject){})
// promise.resolve
// .then(function(){
//     console.log(adder(1,1));
// })

let a = function(a, b){
    return new Promise(function(resolve, reject){
        // console.log(Number.isInteger(a));
        if(Number.isInteger(a) && Number.isInteger(b)){
            resolve(adder(a, b))
        }
        else{
            reject("ValueError")
        }
    })
}

let b
let b1
a(1, 3)
.then(value=>{
    b = value
    console.log(b);
    return a(b, 1)
})
.then(result=>{
    c = result + b1;
    console.log(c);
})
.catch(function(err){
    console.log(err);
    return -1
})
// console.log(b);
// console.log(b+1);
a(1, 2)
.then(value=>{
    b1 = value + b
    console.log(b1);
    return b1
})
.then(value=>{
    console.log(a(value, 1));
    console.log(adder(value,1));
    return a(value, 1)
})
.then(value=>console.log("res"+value))
.catch(function(err){
    console.log(err);
    return -1
})

let q = Promise.resolve()
q = q.then(()=>a(1,2)).then(value=>{
    console.log("R"+value)
    return value
})

console.log(q);

let sum = a(1, 1).then(value=>{sum = value
    return sum})
console.log(sum);