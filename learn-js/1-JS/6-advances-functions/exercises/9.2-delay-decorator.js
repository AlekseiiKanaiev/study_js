function say(str){
    console.log(str);
}

function delayDecorator(func, delay){
    return function(){
        let phrase = Array.from(arguments).join(', ')
        setTimeout(func, delay, phrase);
    }
}

say2000 = delayDecorator(say, 2000);
say1000 = delayDecorator(say, 1000);

say2000('Hello');
say1000('test');

let obj = {
    say1(str){
        console.log(str);
    }
}

obj.say1 = delayDecorator(obj.say1, 3000);

obj.say1('Object test')