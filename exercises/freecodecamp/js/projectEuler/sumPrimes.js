function primeSummation(n) {
    // Good luck!
    let arr = [2];
    let res = 2;
    for (let i = 3; i < n; i++){
        // Есть еще один «ускоритель», проверять только те числа, которые заканчиваются 
        // на 1, 3, 7 или 9 (так как остальные очевидно делятся на 2 или 5). 
        if (i > 10 && (i % 2 === 0 || i % 5 === 0)) continue;
        for (let el of arr){
            if (i % el === 0){
                break;
            }
            /**теорию чисел и понимаем, что переберать надо только числа, не превосходящие корня 
             * из искомого. К примеру, если число M имеет делитель pi, то имеется делитель qi, 
             * такой, что pi * qi = M. То есть, чтобы найти пару, достаточно найти меньшее. 
             * Среди всех пар, предполагаемая пара с максимальным наименьшим — это пара 
             * с равными pi и qi, то есть pi * pi = M => pi = sqrt(M). */
            if (el > Math.sqrt(i)){
                arr.push(i);
                res +=i;
                break;
            }
        }
    }
    // console.log(arr);
    return res;
}

let a = primeSummation(2000000);
console.log(a);

// let arr = [];
// console.log(undefined%2 !== 0);
// console.log(Math.sqrt(3));