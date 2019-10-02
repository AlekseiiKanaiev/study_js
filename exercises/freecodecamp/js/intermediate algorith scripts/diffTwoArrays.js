function diffArray(arr1, arr2) {
    var newArr = [];
    // Same, same; but different.
    let tempSet = new Set(arr1.concat(arr2));
    for (let el of tempSet){
        if (!arr1.includes(el) || !arr2.includes(el)){
            newArr.push(el);
        }
    }
    return newArr;
  }
  
  diffArray([1, 2, 3, 5, 6], [1, 2, 3, 4, 5]);