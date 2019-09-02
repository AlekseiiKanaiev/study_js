let login = prompt('Please enter your login', '');
if (!login){
    alert ('Canceled')
}
else if (login === 'Admin'){
    pass = prompt('Please, enter your password', '');
    if (!pass){
        alert ('Canceled')
    }
    else if (pass === "I'm boss"){
        alert('Hello, boss')
    }
    else{
        alert("Wrong password");
    }

}
else{
    alert("I dont't know you");
}