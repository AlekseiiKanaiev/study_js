const name = prompt('Please? enter your name', 'Your name')
// такая запись верна, но не рекомендуется
// name?
//     alert(`Thank you, ${name}`):
//     alert('Well, hello, anonimus');

//тоже
// if (name) alert(`Thank you, ${name}`);
// else  alert('Well, hello, anonimus');

if (name){
    alert(`Thank you, ${name}`);
}
else {
    alert('Well, hello, anonimus');
}

