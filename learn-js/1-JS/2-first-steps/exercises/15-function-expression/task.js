// function ask(question, yes, no){
//     if(confirm(question)) yes();
//     else no();
// }

// ask('Are you confirm?',
//     () => alert('You accepted'),
//     () => alert('You rejected')
// );


var a = 0;
function f(){
    a=1;
    for (;a<=10;a++){
        console.log(a);
    }
}
f(a);
console.log(a);