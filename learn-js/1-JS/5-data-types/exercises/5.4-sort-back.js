function sortBack(arr){
    return arr.slice().sort((a,b) => a < b)
}

let arr = [5, 2, 1, -10, 8];
let a = sortBack(arr);
console.log(a);
console.log(arr);

function copySorted(arr){
    return arr.slice().sort();
}


let arr1 = ["HTML", "JavaScript", "CSS"];
let b = copySorted(arr1);
console.log(b);
console.log(arr1);
