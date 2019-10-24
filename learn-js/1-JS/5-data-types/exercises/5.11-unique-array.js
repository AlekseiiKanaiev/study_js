function unique(arr){
    // return [...new Set(arr)]
    let res = [];
    arr.forEach(el => {
        if(!res.includes(el)) res.push(el)
    })
    return res;
}

let strings = ["кришна", "кришна", "харе", "харе",
  "харе", "харе", "кришна", "кришна", ":-O"
];

console.log( unique(strings) );
console.log(strings);