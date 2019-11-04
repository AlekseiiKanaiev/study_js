function say(str){
    console.log(str);
}

function throttleDecorator(func, time){
    let lastLaunch = 0;
    let isTime = true;
    let timeOut;

    function makeFunc(phrase){
        func(phrase);
        lastLaunch = Date.now();
        isTime = false;
        setTimeout(() => isTime = true, time);
    }

    return function(){
        let phrase = Array.from(arguments).join(', ');
        if (isTime) {
            if (timeOut) clearTimeout(timeOut);
            makeFunc(phrase);
        } else {
            if (timeOut) clearTimeout(timeOut);
            timeOut = setTimeout(makeFunc, time - (Date.now() - lastLaunch), phrase);
        }
    }
    
}

function throttleDecorator2(func, time){
    let isThrottle = false;
    let saveArgs;

    function wrapper(){
        if (isThrottle){
            saveArgs = arguments;
            return;
        }
        let phrase = Array.from(saveArgs || arguments).join(', ');
        func(phrase);
        isThrottle = true;
        setTimeout(() => {
            isThrottle = false;
            if(saveArgs){
                wrapper(saveArgs);
                saveArgs = null;
            }
        }, time);
    }
    return wrapper;
}

say = throttleDecorator(say, 5000);

say('Hello');
say('Hello again');
say('Hello everyone')
setTimeout(say, 3000, 'Here i am')
setTimeout(say, 1500, 'Here i am again')

let obj = {
    say1(str){
        console.log(str);
    }
}

obj.say1 = throttleDecorator2(obj.say1, 5000);

// obj.say1('Object test1')
// obj.say1('Object test2')
// obj.say1('Object test3')