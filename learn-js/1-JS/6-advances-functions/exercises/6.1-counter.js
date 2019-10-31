function makeCounterClosure(){
    let count = 0;
    return function counter(){
        counter.set = function(value){
            count = value;
        }
        counter.decrease = function(){
            --count;
        }
        counter.increase = function(){
            ++count;
        }
        return count;
    }
}

let counter = makeCounterClosure();

console.log(counter());
counter.set(10);
console.log(counter());
counter.increase()
console.log(counter());
counter.decrease();
console.log(counter());

function makeCounter(){
    function counter(){
        counter.set = function(value){
            counter.count = value;
        }
        counter.decrease = function(){
            --counter.count;
        }
        counter.increase = function(){
            ++counter.count;
        }
        return counter.count;
    }
    counter.count = 0;
    return counter;
}

let counter1 = makeCounter();

console.log(counter1());
counter1.set(10);
console.log(counter1());
counter1.increase()
console.log(counter1());
counter1.decrease();
console.log(counter1());