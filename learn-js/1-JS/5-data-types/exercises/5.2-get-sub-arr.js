function filterRange(arr, a, b){
    return arr.filter((item) => item >= a && item <= b);
}
let arr = [5, 3, 8, 1];
let newArr = filterRange(arr, 1, 4);
console.log(newArr);
console.log(arr);

function filterRangeInPlace(arr, a, b){
    arr.forEach((el)=> {
        if(el <= a || el >= b){
            arr.splice(arr.indexOf(el), 1)
        }
    })
}

let arr1 = [5, 3, 8, 1];
filterRangeInPlace(arr1, 1, 4);
console.log(arr1);