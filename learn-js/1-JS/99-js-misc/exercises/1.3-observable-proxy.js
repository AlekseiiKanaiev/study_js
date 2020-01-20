let handlers = Symbol('handlers');

function makeObserve(target) {
    target[handlers] = new Map();
    target.observe = function(type, handler){
        this[handlers].set(type, handler)
    }

    return new Proxy(target, {
        get(obj, prop, reciever){
            let val = Reflect.get(...arguments);
            console.log('val: '+val);
            if (obj.hasOwnProperty(prop)){
                let handler = obj[handlers].get('get');
                if (typeof handler === 'function') handler();
                // if (typeof obj[prop] === 'function') console.log(JSON.stringify(obj[prop]));;
                // console.log(obj[prop]);
            }  else {
                console.log(`There is no ${prop} property in object`);
            } 
            return (typeof val === 'function') ? val.bind(obj) : val;
        },
        set(obj, prop, val, reciever){
            console.log(`'Setlog': SET ${prop} = ${val}`);
            let result = Reflect.set(...arguments);
            if (result){
                obj[handlers].get('set')(prop, val);
            }
            return result;
        }
    })
}

let user = {};
console.log(1);
user = makeObserve(user);
console.log(2);
user.observe('get', () => console.log('success'));
user.observe('set', (key, val) => console.log(`${key} = ${val}`));

console.log(3);
user.name = 'John';

user.name;

user.age;