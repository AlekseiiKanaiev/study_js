function Accumulator(value){
    this.value = value;
    this.read = function(num){
        this.value += num;
    }
}

const acc = new Accumulator(12);
acc.read(23);
console.log(acc.value);