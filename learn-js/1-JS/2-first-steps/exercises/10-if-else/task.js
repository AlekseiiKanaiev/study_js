num = prompt('Please, enter any integer', 'your integer');
if (Number.isInteger(+num)){
    if (num > 0){
        alert('1')
    }
    else if (num < 0){
        alert('-1');
    }
    else{
        alert('0');
    }
}
else{
    alert('You enter wrong data');
}