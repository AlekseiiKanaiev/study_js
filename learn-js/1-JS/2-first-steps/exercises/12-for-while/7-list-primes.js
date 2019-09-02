const end = 20;
const from = 2;
let arr = [from];
first: for (let i = from+1; i < end; i++){
    for (let j = 0; j < arr.length; j++){
        if (i%arr[j] === 0 && arr[j] !== 1){
            continue first;
        }
    }
    arr.push(i)
}
console.log(arr);