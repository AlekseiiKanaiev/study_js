class FormatError extends SyntaxError {
    constructor(message) {
        super(message);
        this.name = 'FormatError';
    }
}

let err = new FormatError('Error occures');

console.log(err.message);
console.log(err.stack);
console.log(err.name);

console.log(err instanceof FormatError);
console.log(err instanceof SyntaxError);