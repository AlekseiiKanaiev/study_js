let s = 1;
let e = 5;
for (let i of [...(function* (s, e) {for(let i = s; i <= e; i++) yield i})(s, e)]){
    console.log(i);
}
let t = {
    one: 1,
    two: 2,
    tree: 3
};

let r = [...(function* (s, e) {for(let i of Object.values(t)) yield i})(s, e)];
console.log(r);

// let alphabet = [...(function* (s,e){for(let i = s; i <= e; i++) yield String.fromCharCode(i)})(97, 122)];
// console.log(alphabet.join());


function* charGen(s,e) {for(let i = s; i <= e; i++) yield String.fromCharCode(i)};

function* allCharGen() {
    yield* charGen(48, 57);
    yield* charGen(65, 90);
    yield* charGen(97, 122);
}

function* genPassword(num) {
    let allChars = [...allCharGen()];
    for (let i = 0; i <= num; i++){
        yield allChars[Math.round(Math.random() * allChars.length)];
    }
}

let passLength = 6;

let str = [...genPassword(passLength)].join('');

console.log(str);

function* gen() {
    
    let ask1 = yield '2 + 2 = ?';
    let a = yield 1;
    console.log(ask1, a);
    let ask2 = yield '3 * 3 = ?';
    console.log(ask2);
}

let generator = gen();
console.log(generator.next());
console.log(generator.next());
console.log(generator.next(9));
console.log(generator.next(12));