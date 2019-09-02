let num = 0;
while (num <= 100){
    num = prompt('Enter number heigher than 100', '')
    console.log(num);
    if (num === null){
        break;
    }
    else if (!Number.isInteger(+num)){
        num = 0;
    }
}