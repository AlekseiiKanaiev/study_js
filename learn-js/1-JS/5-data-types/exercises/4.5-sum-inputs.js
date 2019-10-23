function sums(){
    let nums = [];
    let el;
    while (true){
        el = prompt('Enter numbers or cancel/not number for exit', 0);
        if(isFinite(el) && el !== null && el !== '') nums.push(el);
        else break;
    }
    console.log(nums);
    return (nums.length) ? nums.reduce((a, b) => +a + +b) : 0;
}

console.log(sums());