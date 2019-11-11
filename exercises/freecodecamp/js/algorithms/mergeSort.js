function mergeSort(array) {
    // change code below this line
    // console.log(array);
    function merge(left, right){
        let res = [];
        let il = 0;
        let ir = 0;
        while (il < left.length && ir < right.length){
            (left[il] > right[ir]) ? res.push(right[ir++]) : res.push(left[il++]);
        }
        return res.concat(left.slice(il)).concat(right.slice(ir));
    }

    if (array.length < 2){
        return array;
    }
    let mid = Math.round(array.length/2);
    return merge(mergeSort(array.slice(0, mid)), mergeSort(array.slice(mid)));
}
  
let a = mergeSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]);
  
console.log(a);



