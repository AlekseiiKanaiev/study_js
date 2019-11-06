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

// say2000('Hello');
// say1000('test');

let obj = {
    say(str){
        console.log(str);
    },
    sayLoud(str){
        alert(str);
    }
}

obj.say = delayDecorator(obj.say, 3000);
obj.sayLoud = delayDecorator(obj.sayLoud, 3000);

obj.say('Object test')
obj.sayLoud('Object test alert')