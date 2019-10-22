function random(min, max){
    return Math.random()*(max-min)+min;
}

// console.log(random(1,5));
// console.log(random(1,5));
// console.log(random(1,5));

function randomInt(min, max){
    return Math.round(Math.random()*(max-min)+min);
}

function randomInt2(min, max){
    return Math.round(Math.random()*(max-min+1)+min-0.5);
}

function randomInt3(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

console.log(randomInt(1,3));
console.log(randomInt2(1,3));
console.log(randomInt3(1,3));