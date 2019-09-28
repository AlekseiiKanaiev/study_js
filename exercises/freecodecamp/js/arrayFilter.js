function filteredArray(arr, elem) {
    return arr.filter(el => !el.includes(elem));
  }
  
  // change code here to test different cases:
  console.log(filteredArray([[3, 2, 3], [1, 6, 3], [3, 13, 26], [19, 3, 9]], 3));

