function sum(a, b){
    console.log(a, b);
    let result;
    // let a = 4, b = 0;
    result = (a+b > 5)?  'Много' : 'Мало';
    alert(result);
}

let a = prompt('Enter first integer', '');
if (a && Number.isInteger(+a)){
    let b = prompt('Enter second integer', '');
    if (b && Number.isInteger(+b)){
        sum(+a,+b);
    }
    else{
        alert('You enter wrong data');
    }
}
else{
    alert('You enter wrong data');
}

let message;
let login = prompt('Enter yur login', '');
console.log(login);
message = (login === 'Сотрудник') ? 'Привет':
        (login === 'Директор') ? 'Здавствуйте':
        (login === '') ? 'Нет логина': '';
alert(message);
