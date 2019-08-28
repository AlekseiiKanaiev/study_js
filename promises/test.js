//create new primise
promise = new Promise(function(){});

//promise which resolves after a second has passed
function delay(time){
    //resolve - return of the Promise function on success
    return new Promise(function(resolve){
        setTimeout(resolve, time)
    })
}
var oneSecondDelay = delay(1000)

function adder(a, b){
    return a+b
}

//setting timeouts for animation, and if the animation is going to fail due to lack 
//of browser support, we want to know immediately instead of after the timeout
// function animationTimeout(step, time){
//     /**if an exception is thrown within the passed-in function, the promise will automatically 
//      * be marked as rejected, with the exception object being stored as the rejected value, 
//      * just as if it had been passed as the argument to reject. */
//     new Promise(function(resolve, reject){
//         if(ainmationSupported(step)){
//             setTimeout(resolve, time)
//         }
//         else{
//             reject("animation is not supported")
//         }
//     })
// }
// var firstKeyframe = animationTimeout(1,1000)

/**handlers passed to ( promise.then ) don’t just handle 
 * the result of the previous promise – whatever they
 * return is turned into a new promise.

promise.then always returns a promise */
//this works with numbers, strings and any old value
delay(1000)
.then(function(){
    console.log(adder(1, 1));
    return 4;
})
.then(function(value){
    console.log(value)//4
    console.log(adder(1, 4));
})
/**But more importantly, it also works with other promises – 
 * returning a promise from a then handler passes that 
 * promise through to the return value of then. This allows 
 * you to chain promises: */
delay(1000)
.then(function(){
    console.log('1 second elapsed');
    console.log(adder(1, 2));
    return delay(10000)
})
.then(function(){
    console.log(adder(1,5));
    console.log('2 seconds elapsed');
})
console.log(adder(1, 0));