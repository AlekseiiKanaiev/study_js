function Calculator(){
    this.a = 0;
    this.b = 0;
    this.read = function (a, b) {
        this.a = a;
        this.b = b;
    }
    this.sum = () => console.log(this.a + this.b);
    
    this.mul = () => console.log(this.a * this.b);
}

const cal = new Calculator();

cal.read(2, 3);
cal.sum();
cal.mul();