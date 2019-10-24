function Calculator(){
    let methods = {
        '+': (a,b) => a+b,
        '-': (a,b) => a-b
    }
    this.calculate = function (str){
        let arr = str.split(' ');
        if (arr.length !== 3 || !methods[arr[1]]) return NaN;
        return (methods[arr[1]].apply(null, [+arr[0], +arr[2]]))
    }
    this.addMethod = function(oper, func){
        methods[oper] = func;
    }
}

let calc = new Calculator();
console.log(calc.calculate('1 + 3'));
console.log(calc.calculate('1 - 3'));

calc.addMethod('*', (a, b) => a * b);
calc.addMethod('/', (a, b) => a / b);
calc.addMethod('**', (a, b) => a ** b);

console.log(calc.calculate('2 * 3'));
console.log(calc.calculate('4 / 2'));
console.log(calc.calculate('2 ** 3'));