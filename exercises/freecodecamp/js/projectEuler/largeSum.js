function largeSum(arr) {
    // Good luck!
    // let first = arr[0];
    // let second = arr[1];
    // let res = +first.slice(0, 10) + +second.slice(0, 10);
    // for (let i = 10; i < first.length; i++){
    //     if (+first[i] + +second[i] >= 10){
    //         res++;
    //         break;
    //     } else if (+first[i] + +second[i] <= 8) break;
    // }
    
    // console.log(res);
    let res = +arr.reduce((a, b) => a + +b, 0).toString().slice(0, 11)*Math.pow(10, 9)
    console.log(res);
    return res;
}
  
  // only change code above this line
  
  const testNums = [
    '37107287533902102798797998220837590246510135740250',
    '46376937677490009712648124896970078050417018260538'
];

largeSum(testNums);