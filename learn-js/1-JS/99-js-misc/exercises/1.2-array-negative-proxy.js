let arr = [1, 2, 3, 4, 5];

function arrWrap(arr){
    return new Proxy(arr, {
        get(target, prop, reciever){
            // console.log(typeof prop);
            // console.log(prop);
            // console.log(prop.length);
            // console.log('-----------');
            if (typeof prop === 'string' && prop < 0){
                return Reflect.get(target, target.length + +prop, reciever);
            }
            return Reflect.get(...arguments);
        },
        set(target, prop, value, reciever){
            if (prop < 0){
                return Reflect.set(target, target.length + +prop, value, reciever);
            }
            return Reflect.set(...arguments);
        },
    })
}

console.log(arr);
arr = arrWrap(arr);

console.log(arr);

console.log(arr[-1]);

arr[-1] = 6;

console.log(arr[-1]);

for (let el of arr) console.log(el);