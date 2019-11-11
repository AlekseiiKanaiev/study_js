function selectionSort(array) {
    // change code below this line
    // let res = [];
    // while(array.length){
    //     res.push(...array.splice(array.indexOf(Math.min(...array)), 1));
    // }
    // return res
    for(let i = 0; i < array.length; i++){
        let minInd = array.slice(i).indexOf(Math.min(...array.slice(i)))+i;
        [array[i], array[minInd]] = [array[minInd], array[i]];
    }
    return array;
    // change code above this line
  }
  
  
  selectionSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]);
