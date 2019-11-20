const Clock = require('./1.1-rewrite-to-class');

// console.log(Clock);

class ExtendedClock extends Clock {
    constructor({template}){
        super({template});
        this.precision = 1000;
    }
    start(){
        this.render();
        this.timer = setInterval(() => this.render(), this.precision)
    }
}

let newClock = new ExtendedClock({template: 'h:m:s'});

newClock.start();
setTimeout(() => newClock.stop(), 5000)