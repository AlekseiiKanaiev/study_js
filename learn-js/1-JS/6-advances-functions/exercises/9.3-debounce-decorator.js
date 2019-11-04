function say(str){
    console.log(str);
}

function debounceDecorator(func, time){
    let lastLaunch = 0;
    return function(){
        let curLaunch = Date.now();
        if (curLaunch - lastLaunch > time) {
            lastLaunch = curLaunch;
            let phrase = Array.from(arguments).join(', ');
            func(phrase);
        }
    }
}

say = debounceDecorator(say, 1000);

say('Hello');
say('Hello again');
setTimeout(say, 1000, 'Here i am')
setTimeout(say, 1500, 'Here i am again')