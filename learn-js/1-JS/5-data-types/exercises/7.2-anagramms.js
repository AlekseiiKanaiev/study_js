function filterAnagramms(arr){
    let res = [];
    arr.map(el => {
        if(res.every(item => !isEqSets(new Set(el.toLowerCase()), new Set(item)))) {
            res.push(el)
        }
    })
    return res;
}
function isEqSets(set1, set2){
    if(set1.size !== set2.size) return false;
    for (let el of set1){
        set2.add(el)
    }
    return set1.size === set2.size
}

//another way
function aclean(arr){
    let res = new Map();
    arr.forEach(el => {
        res.set(el.toLowerCase().split('').sort().join(''), el)
    })
    return [...res.values()]
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log( filterAnagramms(arr) );
console.log( aclean(arr) );
// let a = new Set('ab')
// let b = new Set(['c','b','a','d'])
// console.log(a.add(...b));