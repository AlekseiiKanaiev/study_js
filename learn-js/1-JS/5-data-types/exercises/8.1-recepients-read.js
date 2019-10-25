let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

let wMap = new WeakMap();
for (let obj of messages){
    wMap.set(obj, false);
}

for (let obj of messages){
    if(wMap.has(obj)) console.log(wMap.get(obj));
}



function read(obj){
    if (wMap.has(obj)) wMap.set(obj, new Date(Date.now()))
}

read(messages[2]);
console.log(wMap.get(messages[2]));

messages.pop();

console.log(wMap.get(messages[2]));