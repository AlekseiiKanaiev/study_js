function permutator(str) {
// search number of permutations in string
    let arr = Array.from(str);
    let charSet = new Set(arr);
    let counter = 0;
  
    function permute(arr, memo = []) {
        let cur;
  
        for (let i = 0; i < arr.length; i++) {
            cur = arr.splice(i, 1);
            if (arr.length === 0) {
                let varArr = memo.concat(cur);
                console.log(varArr);
                if ([...charSet].every(char => {
                    let re = new RegExp(char+'{2}')
                    return !re.test(varArr.join(''))
                })) 
                {
                    counter++;
                }
            }
            permute(arr.slice(), memo.concat(cur));
            arr.splice(i, 0, cur[0]);
        }
        return counter;
    }
  
    return permute(arr);
}


let a = [1, 2, 3]
let b = a.splice(0, 1);
console.log(a);
a.splice(0, 0, b[0])
console.log(permutator('asda'));