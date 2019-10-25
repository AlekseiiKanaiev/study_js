function topSalaries(obj){
    // if (Object.values(obj).length === 0) return null;
    // let max = 0;
    // let res = ''
    // for (let [key, val] of Object.entries(obj)){
    //     if (val > max){
    //         max = val;
    //         res = key
    //     }
    // }
    // return res;
    return (Object.values(obj).length) ? 
        Object.keys(obj).filter(el => obj[el] === Math.max(...Object.values(obj)))[0] : 
        null;
}

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

let a = {};

console.log(topSalaries(salaries));
console.log(topSalaries(a));