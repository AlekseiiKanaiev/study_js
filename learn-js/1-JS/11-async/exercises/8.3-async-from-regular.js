async function wait() {
    await new Promise(res => setTimeout(res, 1000));
    return 10;
}

function f(){
    (async () => {
        let a = await wait();
        console.log(a);
    })();
    // or
    wait().then(console.log)
    console.log(1);
}

f();