function getMaxSubArr(arr){
    let subArr = [];
    const max = Math.max(...arr);
    subArr.push(max)
    const indMax = arr.indexOf(max);
    const lArr = arr.slice(0, indMax).reverse();
    const rArr = arr.slice(indMax + 1);
    // console.log(rArr);
    // console.log(lArr);
    subArr.push(...getArr(lArr))
    subArr.push(...getArr(rArr))
    return subArr.reverse();
}

function getArr(arr){
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

function getMaxSubSum(arr) {
    //for onle sum of arr
    let maxSum = 0;
    let partialSum = 0;
  
    for (let item of arr) { // для каждого элемента массива
      partialSum += item; // добавляем значение элемента к partialSum
      maxSum = Math.max(maxSum, partialSum); // запоминаем максимум на данный момент
      if (partialSum < 0) partialSum = 0; // ноль если отрицательное
    }
  
    return maxSum;
}
  

console.log(getMaxSubArr([-1, 2, 3, -5, 5]));
console.log('-------------------------');
console.log(getMaxSubArr([2, -1, 2, 3, -9]));
console.log('-------------------------');
console.log(getMaxSubArr([-1, 2, 3, -9, 11]));
console.log('-------------------------');
console.log(getMaxSubArr([-2, -1, 1, 2]));
console.log('-------------------------');
console.log(getMaxSubArr([100, -9, 2, -3, 5]));
console.log('-------------------------');
console.log(getMaxSubArr([1, 2, 3]));
// console.log([1,2,3].slice(1));