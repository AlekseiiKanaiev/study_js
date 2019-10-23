function getMaxSubSum(arr){
    let subArr = [];
    const max = Math.max(...arr);
    subArr.push(max)
    const indMax = arr.indexOf(max);
    const lArr = arr.slice(0, indMax).reverse();
    const rArr = arr.slice(indMax + 1);
    // console.log(rArr);
    // console.log(lArr);
    subArr.push(...getNums(lArr))
    subArr.push(...getNums(rArr))
    return subArr;
}

function getNums(arr){
    let subArr = [];
    for (let i = 0, j = 0, s = 0; i < arr.length; i++){
        s += arr[i];
        if (s >= 0){
            subArr.push(...arr.slice(j, i + 1));
            j = i + 1;
            s = 0;
        }
    }
    return subArr;
}

console.log(getMaxSubSum([-1, 2, 3, -9]));
console.log('-------------------------');
console.log(getMaxSubSum([2, -1, 2, 3, -9]));
console.log('-------------------------');
console.log(getMaxSubSum([-1, 2, 3, -9, 11]));
console.log('-------------------------');
console.log(getMaxSubSum([-2, -1, 1, 2]));
console.log('-------------------------');
console.log(getMaxSubSum([100, -9, 2, -3, 5]));
console.log('-------------------------');
console.log(getMaxSubSum([1, 2, 3]));
// console.log([1,2,3].slice(1));