function bubbleSort(array) {
    // change code below this line
    let isNoSwap = true;
    for (let j = 0; j < array.length; j ++){
        for (let i = 0; i < array.length-1-j; i++){
            if (array[i] > array[i+1]){
                [array[i], array[i+1]] = [array[i+1], array[i]];
                isNoSwap = false;
            }
        }
        if (isNoSwap) break;
    }
    return array;
    // change code above this line
}

function bubbleSort2(array){
    let last = [];
    function sortArray(arr){
        let isNoSwap = true;
        for (let i = 0; i < arr.length-1; i++){
            if (arr[i] > arr[i+1]){
                [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
                isNoSwap = false;
            }
        }
        if (isNoSwap){
            return arr;
        } else {
            last.unshift(arr.pop())
            sortArray(arr)
        }
        return arr.concat(last);
        // return isNoSwap ? arr : sortArray(arr.slice(0, -1)).concat(arr[arr.length-1]);
    }
    return sortArray(array);
}

let a = bubbleSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]);
let b = bubbleSort2([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]);
console.log(a);
console.log(b);