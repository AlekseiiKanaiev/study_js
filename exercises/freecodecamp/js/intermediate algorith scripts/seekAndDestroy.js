function destroyer(arr) {
    // Remove all the values
    let res = arr.slice();
    for (let el of arguments){
        if (res.indexOf(el) !== -1){
            res = res.filter(elem => elem !== el)
        }
    }
    return res;
  }
  let arr = [1, 2, 3, 1, 2, 3]
  console.log(destroyer(arr, 2, 3));
  console.log(arr);