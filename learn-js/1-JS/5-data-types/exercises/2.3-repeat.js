function repeat(){
    let num;

    do {
        num = prompt("Введите число", 0);
    } while ( !isFinite(num) );

    console.log(num);
    if (num === null || num === '') return null;
    
    return +num;
}
console.log(repeat());
