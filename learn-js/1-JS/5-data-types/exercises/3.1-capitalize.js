function capitalize(str){
    return str.replace(str[0], str[0].toUpperCase());
}

let a = 'alex';
let b = capitalize(a);
console.log(a);
console.log(b);