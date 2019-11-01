function printNumsInterval(from, to){
    //for infinity loop
    // for (let i = from, j = 1; i <= to; i++, j++){
    //     setTimeout(() => console.log(i), 1000*j)
    // }
    // setInterval(() =>{
    //     for (let i = from, j = 1; i <= to; i++, j++){
    //         setTimeout(() => console.log(i), 1000*j)
    //     }
    // }, 1000*to)
    //for immediately launch function:
    console.log(from++);
    let timer = setInterval(() => {
        console.log(from);
        if (from == to){
            clearInterval(timer);
        }
        from++;
    }, 1000)
}



function printNumsTimeout(from, to){
    //for immediately launch function:
    console.log(from++);
    for (let i = from, j = 1; i <= to; i++, j++){
        setTimeout(() => console.log(i), 1000*j)
    }
    //for infinity loop
    // setTimeout(printNumsTimeout, 1000*to, from, to)
}



function printNumsTimeOutRecursive(from, to){
    //in this implemetation we can not launch function immediately:
    setTimeout(() => {
        console.log(from);
        if (from !== to){
            printNumsTimeOutRecursive(++from, to)
        }
    }, 1000)
}



function printNumbers(from, to) {
    let current = from;
    //for immediately launch function:
    console.log(current++);
    setTimeout(function go() {
      console.log(current);
      if (current < to) {
        setTimeout(go, 1000);
      }
      current++;
    }, 1000);
}


// printNumsInterval(1, 10);
// printNumsTimeout(1,10);
printNumsTimeOutRecursive(1,10);
// printNumbers(1,10);