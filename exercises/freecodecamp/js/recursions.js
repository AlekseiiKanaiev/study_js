// function sum(arr, n){
//     if (n === undefined || n > (arr.length -1)){
//         n = arr.length -1;
//     }
//     if (n === 0){
//         return arr[n];
//     }
//     return arr[n] + sum(arr, n-1)
// }
// console.log(sum([1,5,7], 2));


function count(m, n) {
    if (n === m) {
      return [m];
    } else {
      var numbers = count(m, n - 1); 
      numbers.push(n);
      return numbers;
    }
}
  
console.log(count(2, 3))

function rangeOfNumbers(startNum, endNum) {
  if (startNum === endNum){
    return [endNum];
  } else {
    let numbers = rangeOfNumbers(startNum + 1, endNum); 
    numbers.push(startNum);
    return numbers;
  }
};

console.log(rangeOfNumbers(6, 9));

function countdown(myArray, n){
    if (n < 0){
        return []
    } else if (n === 0){
        return [myArray.length]
    } else {
        myArray.push(n);
        countdown(myArray, n-1)
        return myArray;
    }
}

console.log(countdown([], 9));