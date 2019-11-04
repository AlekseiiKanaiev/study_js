function work(a, b){
    console.log(a + b);
}

function workSpyDecorator(func){
    f.calls = [];
    function f(){
        f.calls.push([...arguments])
        func.call(this, ...arguments)
    }
    return f;
}

work = workSpyDecorator(work);

work(1, 2);
work(1, 2);
work(3, 2);

console.log(work.calls);
for (let args of work.calls) {
    console.log( 'call:' + args.join());
}