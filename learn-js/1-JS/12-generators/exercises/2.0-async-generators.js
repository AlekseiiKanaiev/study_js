async function* gen(s, e) {
    for (let i = s; i <= e; i++) {
        await new Promise(res => setTimeout(res, 1000));
        yield i;
    }
}
let r = [];
(async () => {
    // let r = [];
    for await (let v of gen(1, 5)) {
        r.push(v);
    };
    console.log(r);
})();