function insertionSort(array) {
    // change code below this line
    for (let i = 1; i < array.length; i++){
        for (let j = i-1; j >= 0; j--){
            console.log(array[i], array[j]);
            if (array[j+1] < array[j]){
                [array[j+1], array[j]] = [array[j], array[j+1]]
            }
        }
    }
    return array;
    // change code above this line
}

let a = insertionSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]);
console.log(a);