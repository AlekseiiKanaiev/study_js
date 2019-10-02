function sumFibs(num) {
    let res = [1];
    for (let i = 1, j =0 ; i <= num; i += res[j], j++){
      res.push(i);
    }
    console.log(res)
    return res.filter(el => el % 2 !== 0).reduce((a, b) => a + b);
  }
  
// let a = sumFibs(100);
// console.log(a)

