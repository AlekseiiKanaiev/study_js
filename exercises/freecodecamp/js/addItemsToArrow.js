"use_strict"
function mixedNumbers(arr) {
  // change code below this line
  let begin = ['I', 2, 'three'];
  let end = [7, 'VIII', 9];
  let a = {
    'as' : 2
  }
  for (let [k, v] of Object.entries(a)){
    console.log(k, v);
  }

  for (let [b, e] of zip([begin.reverse(), end])){
    arr.unshift(b);
    arr.push(e);
    a[b] = e;
  }
    // for (let el of begin.reverse()){
    //     arr.unshift(el);
    // }
    // for (let el of end){
    //     arr.push(el);
    // }
  // change code above this line
  console.log(a);
  return arr;
}
function zip(arrays) {
    return arrays[0].map(function(_,i){
        return arrays.map(function(array){return array[i]})
    });
}
// do not change code below this line
console.log(mixedNumbers(['IV', 5, 'six']));



