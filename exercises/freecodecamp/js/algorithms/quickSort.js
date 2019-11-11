function quickSort(array) {
    // change code below this line
    // console.log(array);
    let arr = array.slice();
    if (arr.length > 1){
        let index = arr.length-1;
        for (let i = arr.length-2; i >= 0; i--){
            if (arr[index] < arr[i]){
                arr.push(...arr.splice(i, 1));
                index--;
            }
        }
        return  quickSort(arr.slice(0, index)).concat(quickSort(arr.slice(index)));
    }
    return arr;
    // change code above this line
}

let a = quickSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]);
console.log(a);


// let b = [1, 2, 3];
// let n = b[1]
// console.log(b.slice(1));
