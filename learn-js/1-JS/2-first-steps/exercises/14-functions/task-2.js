function checkAge1(age){
    if (age>18){
        return true;
    }
    return 'Check';
}
function checkAge2(age){
    return (age>18) || 'Check';
}
function checkAge3(age){
    return (age>18)? true: 'Check';
}
let age = 15;
console.log(checkAge1(age));
console.log(checkAge2(age));
console.log(checkAge3(age));