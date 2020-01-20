# Proxy и Reflect

Объект `Proxy` "оборачивается" вокруг другого объекта и может перехватывать (и, при желании, самостоятельно обрабатывать) разные действия с ним, например чтение/запись свойств и другие. Далее мы будем называть такие объекты "прокси".

Прокси используются во многих библиотеках и некоторых браузерных фреймворках. В этой главе мы увидим много случаев применения прокси в решении реальных задач.

Синтаксис:

```js
let proxy = new Proxy(target, handler)
```

- `target` -- это объект, для которого нужно сделать прокси, может быть чем угодно, включая функции.
- `handler` -- конфигурация прокси: объект с "ловушками" ("traps"): методами, которые перехватывают разные операции, например, ловушка `get` - для чтения свойства из `target`, ловушка `set` - для записи свойства в `target` и так далее.

При операциях над `proxy`, если в `handler` имеется соответствующая "ловушка", то она срабатывает, и прокси имеет возможность по-своему обработать её, иначе операция будет совершена над оригинальным объектом `target`.

В качестве начального примера создадим прокси без всяких ловушек:

```js run
let target = {};

let proxy = new Proxy(target, {}); // пустой handler

proxy.test = 5; // записываем в прокси (1)
alert(target.test); // 5, свойство появилось в target!

alert(proxy.test); // 5, мы также можем прочитать его из прокси (2)

for(let key in proxy) alert(key); / test, итерация работает (3)
```

Так как нет ловушек, то все операции на `proxy` применяются к оригинальному объекту `target`.

1. Запись свойства `proxy.test=` устанавливает значение на `target`.
2. Чтение свойства `proxy.test` возвращает значение из `target`.
3. Итерация по `proxy` возвращает значения из `target`.

Как мы видим, без ловушек `proxy` является прозрачной обёрткой над `target`.

`Proxy` -- это особый, "экзотический", объект, у него нет собственных свойств. С пустым `handler` он просто перенаправляет все операции на `target`.

Чтобы активировать другие его возможности, добавим ловушки.

Что именно мы можем ими перехватить?

Для большинства действий с объектами в спецификации JavaScript есть так называемый "внутренний метод", который на самом низком уровне описывает, как его выполнять. Например, `[[Get]]` - внутренний метод для чтения свойства, `[[Set]]` -- для записи свойства, и так далее. Эти методы используются только в спецификации, мы не можем обратиться напрямую к ним по имени.

Ловушки как раз перехватывают вызовы этих внутренних методов. Полный список методов, которые можно перехватывать, перечислен в [спецификации Proxy](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots), а также в таблице ниже.

Для каждого внутреннего метода в этой таблице указана ловушка, то есть имя метода, который мы можем добавить в параметр `handler` при создании `new Proxy`, чтобы перехватывать данную операцию:

| Внутренний метод | Ловушка | Что вызывает |
|-----------------|----------------|-------------|
| `[[Get]]` | `get` | чтение свойства |
| `[[Set]]` | `set` | запись свойства |
| `[[HasProperty]]` | `has` | оператор `in` |
| `[[Delete]]` | `deleteProperty` | оператор `delete` |
| `[[Call]]` | `apply` | вызов функции |
| `[[Construct]]` | `construct` | оператор `new` |
| `[[GetPrototypeOf]]` | `getPrototypeOf` | [Object.getPrototypeOf](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf) |
| `[[SetPrototypeOf]]` | `setPrototypeOf` | [Object.setPrototypeOf](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf) |
| `[[IsExtensible]]` | `isExtensible` | [Object.isExtensible](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible) |
| `[[PreventExtensions]]` | `preventExtensions` | [Object.preventExtensions](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions) |
| `[[DefineOwnProperty]]` | `defineProperty` | [Object.defineProperty](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), [Object.defineProperties](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) |
| `[[GetOwnProperty]]` | `getOwnPropertyDescriptor` | [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor), `for..in`, `Object.keys/values/entries` |
| `[[OwnPropertyKeys]]` | `ownKeys` | [Object.getOwnPropertyNames](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames), [Object.getOwnPropertySymbols](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols), `for..in`, `Object.keys/values/entries` |

###"Инварианты"

JavaScript налагает некоторые условия - инварианты на реализацию внутренних методов и ловушек.

Большинство из них касаются возвращаемых значений:
- Метод `[[Set]]` должен возвращать `true`, если значение было успешно записано, иначе `false`.
- Метод `[[Delete]]` должен возвращать `true`, если значение было успешно удалено, иначе `false`.
- ...и так далее, мы увидим больше в примерах ниже.

Есть и другие инварианты, например:
- Метод `[[GetPrototypeOf]]`, применённый к прокси, должен возвращать то же значение, что и метод `[[GetPrototypeOf]]`, применённый к оригинальному объекту. Другими словами, чтение прототипа объекта прокси всегда должно возвращать прототип оригинального объекта.

Ловушки могут перехватывать вызовы этих методов, но должны выполнять указанные условия.

Инварианты гарантируют корректное и последовательное поведение конструкций и методов языка. Полный список инвариантов можно найти в [спецификации](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots), хотя скорее всего вы не нарушите эти условия, если только не соберётесь делать что-то совсем уж странное.

## Значение по умолчанию с ловушкой "get"

Чаще всего используются ловушки на чтение/запись свойств.

Чтобы перехватить операцию чтения, `handler` должен иметь метод  `get(target, property, receiver)`.

Он срабатывает при попытке прочитать свойство объекта, с аргументами:

- `target` -- это оригинальный объект, который передавался первым аргументом в конструктор `new Proxy`,
- `property` -- имя свойства,
- `receiver` -- если свойство объекта является геттером, то `receiver` - это объект, который будет использован как `this` при его вызове. Обычно это сам объект прокси (или наследующий от него объект). Прямо сейчас нам не понадобится этот аргумент, подробнее разберём его позже.

Давайте применим ловушку `get`, чтобы реализовать "значения по умолчанию" для свойств объекта.

Например, сделаем числовой массив, так чтобы при чтении из него несуществующего элемента возвращался `0`.

Обычно при чтении из массива несуществующего свойства возвращается `undefined`, но мы обернём обычный массив в прокси, который перехватывает операцию чтения свойства из массива и возвращает `0`, если такого элемента нет:

```js run
let numbers = [0, 1, 2];
numbers = new Proxy(numbers, {
    get(target, prop) {
        if(prop in target) {
            return target[prop];
        } else {
            return 0;
        }
    }
});

alert(numbers[1]);// 1
alert(numbers[123]); //0 (нет такого элемента)
```

Как видно, это очень легко сделать при помощи ловушки `get`.

Мы можем использовать `Proxy` для реализации любой логики возврата значений по умолчанию.

Представим, что у нас есть объект-словарь с фразами на английском и их переводом на испанский:

```js run
let dictionary = {
    'Hello': 'Hola',
    'Bye': 'Adiós'
};

alert(dictionary['Hello']); // Hola
alert(dictionary['Welcome']); // undefined
```

Сейчас, если фразы в `dictionary` нет, при чтении возвращается `undefined`. Но на практике оставлять фразы непереведёнными лучше, чем использовать `undefined`. Поэтому давайте сделаем так, чтобы при отсутствии перевода возвращалась оригинальная фраза на английском вместо `undefined`.

Чтобы достичь этого, обернём `dictionary` в прокси, перехватывающий операцию чтения:

```js run
let dictionary = {
  'Hello': 'Hola',
  'Bye': 'Adiós'
};

dictionary = new Proxy(dictionary, {
    get(target, phrase){
        // перехватываем чтение свойства в dictionary
        if(phrase in target) {
            // если перевод для фразы есть в словаре
            return target[phrase]; // возвращаем его
        } else {
            // иначе возвращаем непереведённую фразу
            return phrase;
        }
    }
});

// Запросим перевод произвольного выражения в словаре!
// В худшем случае оно не будет переведено
alert(dictionary['Hello']); // Hola
alert(dictionary['Welcome to Proxy']); // Welcome to Proxy (нет перевода)
```

###"Прокси следует использовать везде вместо `target`"

Пожалуйста, обратите внимание: прокси перезаписывает переменную:

```js
dictionary = new Proxy(dictionary, ...);
```

Прокси должен заменить собой оригинальный объект повсюду. Никто не должен ссылаться на оригинальный объект после того, как он был проксирован. Иначе очень легко запутаться.

## Валидация с ловушкой "set"

Допустим, мы хотим сделать массив исключительно для чисел. Если в него добавляется значение иного типа, то это должно приводить к ошибке.

Ловушка `set` срабатывает, когда происходит запись свойства.

`set(target, property, value, receiver)`:

- `target` -- это оригинальный объект, который передавался первым аргументом в конструктор `new Proxy`,
- `property` -- имя свойства,
- `value` -- значение свойства,
- `receiver` -- аналогично ловушке `get`, этот аргумент имеет значение, только если свойство - сеттер.

Ловушка `set` должна вернуть `true`, если запись прошла успешно, и `false` в противном случае (будет сгенерирована ошибка `TypeError`).

Давайте применим её для проверки новых значений:

```js run
let numbers = [];

numbers = new Proxy(numbers, {
    set(target, prop, value){
        // для перехвата записи свойства
        if(typeof value == 'number'){
            target[prop] = val;
            return true;
        } else {
            return false;
        }
    }
});

numbers.push(1); // добавилось успешно
numbers.push(2); // добавилось успешно
alert("Длина: " + numbers.length); // 2

numbers.push('test'); // TypeError (ловушка set на прокси вернула false)

alert('Error'); // Интерпретатор никогда не доходит до этой строки (из-за ошибки в строке выше)
```

Обратите внимание, что встроенный функционал массива по-прежнему работает! Значения добавляются методом `push`. Свойство `length` при этом увеличивается. Наш прокси ничего не ломает.

Нам не нужно переопределять методы массива `push` и `unshift` и другие, чтобы добавлять туда проверку на тип, так как внутри себя они используют операцию `[[Set]]`, которая перехватывается прокси.

Таким образом, код остаётся чистым и прозрачным.

###"Не забывайте вернуть `true`"

Как сказано ранее, нужно соблюдать инварианты.

Для `set` реализация ловушки должна возвращать `true` в случае успешной записи свойства.

Если забыть это сделать или возвратить любое ложное значение, это приведёт к ошибке `TypeError`.

## Перебор при помощи "ownKeys" и "getOwnPropertyDescriptor"

`Object.keys`, цикл `for..in` и большинство других методов, которые работают со списком свойств объекта, используют внутренний метод `[[OwnPropertyKeys]]` (перехватываемый ловушкой `ownKeys`) для их получения.

Такие методы различаются в деталях:
- `Object.getOwnPropertyNames(obj)` возвращает не-символьные ключи.
- `Object.getOwnPropertySymbols(obj)` возвращает символьные ключи.
- `Object.keys/values()` возвращает не-символьные ключи/значения с флагом `enumerable` (подробнее про флаги свойств было в главе <info:property-descriptors>).
- `for..in` перебирает не-символьные ключи с флагом `enumerable`, а также ключи прототипов.

...Но все они начинают с этого списка.

В примере ниже мы используем ловушку `ownKeys`, чтобы цикл `for..in` по объекту, равно как `Object.keys` и `Object.values` пропускали свойства, начинающиеся с подчёркивания `_`:

```js run
let user = {
    name: 'John',
    age: 30,
    _password: ******
};

user = new Proxy(user, {
    ownKeys(target) {
        return Object.keys(target).filter(key => !key.startWith('_'));
    }
});

// ownKeys исключил _password
for(let key in user) alert(key); // name, age

// аналогичный эффект для этих методов:
alert(Object.keys(user)); // name, age
alert(Object.values(user)); // John, 30
```

Как видно, работает.

Впрочем, если мы попробуем возвратить ключ, которого в объекте на самом деле нет, то `Object.keys` его не выдаст:

```js run
let user = {};

user = new Proxy(user, {
    ownKeys(target) {
        return['a', 'b', 'c'];
    }
});

alert(Object.keys(user)); //  <пусто>
```

Почему? Причина проста: `Object.keys` возвращает только свойства с флагом `enumerable`. Для того, чтобы определить, есть ли этот флаг, он для каждого свойства вызывает внутренний метод `[[GetOwnProperty]]`, который получает [его дескриптор](info:property-descriptors). А в данном случае свойство отсутствует, его дескриптор пуст, флага `enumerable` нет, поэтому оно пропускается.

Чтобы `Object.keys` возвращал свойство, нужно либо чтобы свойство в объекте физически было, причём с флагом `enumerable`, либо перехватить вызовы `[[GetOwnProperty]]` (это делает ловушка `getOwnPropertyDescriptor`), и там вернуть дескриптор с `enumerable: true`.

Вот так будет работать:

```js run
let user = {};
user = new Proxy(user, {
    ownKeys(target) {
        вызывается 1 раз для получения списка свойств
        return ['a', 'b', 'c'];
    },

    getOwnPropertyDescriptor(target, prop) {
        // вызывается для каждого свойства
        return {
            enumerable: true,
            configurable: true
            /* ...другие флаги, возможно, "value: ..." */
        }
    }
});

alert(Object.keys(user)); // a, b, c
```

Ещё раз заметим, что получение дескриптора нужно перехватывать только если свойство отсутствует в самом объекте.

## Защищённые свойства с ловушкой "deleteProperty" и другими

Существует широко распространённое соглашение о том, что свойства и методы, название которых начинается с символа подчёркивания `_`, следует считать внутренними. К ним не следует обращаться снаружи объекта.

Однако технически это всё равно возможно:

```js run
let user = {
    name: 'John',
    _password: '******'
};

alert(user._password); // ******

Давайте применим прокси, чтобы защитить свойства, начинающиеся на `_`, от доступа извне.

Нам будут нужны следующие ловушки:
- `get` - для того, чтобы сгенерировать ошибку при чтении такого свойства,
- `set` - для того, чтобы сгенерировать ошибку при записи,
- `deleteProperty` - для того, чтобы сгенерировать ошибку при удалении,
- `ownKeys` - для того, чтобы исключить такие свойства из `for..in` и методов типа `Object.keys`.

Вот соответствующий код:

```js run
let user = {
    name: 'John',
    _password: '******'
};

user = new Proxy(user, {
    get(target, prop) {
        if(prop.startWith('_')){
            throw new Error("Отказано в доступе");
        }
        let value = target[prop];
        return (typeof value === 'function') ? value.bind(target) : value; // (*)
    },
    set(target, prop, value){
        // перехватываем запись свойства
        if(prop.startWith('_')){
            throw new Error("Отказано в доступе");
        }
        target[prop] = val;
        return true;
    },
    deleteProperty(target, prop){
        // перехватываем удаление свойства
         if(prop.startWith('_')){
            throw new Error("Отказано в доступе");
        }
        delete target[prop];
        return true;
    },
    ownKeys(target){
        // перехватываем попытку итерации
        return Object.keys(target).filter(key => !key.startWith('_'));
    }
});

// "get" не позволяет прочитать _password
try {
    alert(user._password);
} catch(e) {
    alert(e.message) // Error: Отказано в доступе
}

// "set" не позволяет записать _password
try {
    user._password = 'test'
} catch(e) {
    alert(e.message); // Error: Отказано в доступе 
}

// "deleteProperty" не позволяет удалить _password

try{
    delete user._password;
} catch(e) {
    alert(e.message); //  Error: Отказано в доступе
}

// "ownKeys" исключает _password из списка видимых для итерации свойств
for(let key in user) alert(key); // name
```

Обратите внимание на важную деталь в ловушке `get` на строке `(*)`:

```js
get(target, prop) {
    // ...
    let value = target[prop];
    return (typeof value === 'function') ? value.bind(target) : value;
}
```

Вызов функции `value.bind(target)` из-за того, что метод самого объекта, например `user.checkPassword()`, должен иметь доступ к свойству `_password`:

```js
user = {
    // ...
    checkPassword(value) {
        // метод объекта должен иметь доступ на чтение _password
        return value === this._password;
    }
}
```

Вызов `user.checkPassword()` получает проксированный объект `user` в качестве `this` (объект перед точкой становится `this`), так что когда такой вызов обращается к `this._password`, ловушка `get` вступает в действие (она срабатывает при любом чтении свойства), и выбрасывается ошибка.

Поэтому мы привязываем контекст к методам объекта - оригинальный объект `target` в строке `(*)`. Тогда их дальнейшие вызовы будут использовать `target` в качестве `this`, без всяких ловушек.

Такое решение обычно работает, но не является идеальным, поскольку метод может передать оригинальный объект куда-то ещё, и возможна путаница: где изначальный объект, а где - проксированный.

К тому же, объект может проксироваться несколько раз (для добавления различных возможностей), и если передавать методу исходный, то могут быть неожиданности.

Так что везде использовать такой прокси не стоит.

###"Приватные свойства в классах"

Современные интерпретаторы JavaScript поддерживают приватные свойства в классах. Названия таких свойств должны начинаться с символа `#`. Для них не нужны подобные прокси.

Впрочем, приватные свойства имеют свои недостатки. В частности, они не наследуются.

## "В диапазоне" с ловушкой "has"

Давайте посмотрим ещё примеры.

Предположим, у нас есть объект `range`, описывающий диапазон:

```js
let range = {
    start: 1,
    end: 10
};
```

Мы бы хотели использовать оператор `in`, чтобы проверить, что некоторое число находится в указанном диапазоне.

Ловушка `has` перехватывает вызовы `in`.

`has(target, property)`

- `target` -- это оригинальный объект, который передавался первым аргументом в конструктор `new Proxy`,
- `property` -- имя свойства

Вот демо:

```js run
let range = {
    start: 1,
    end: 10
};

range = new Proxy(range, {
    has(target, prop) {
        return prop >= target.start && prop <= target.end
    }
});

alert(5 in range); // true
alert(50 in range); // false
```

## Оборачиваем функции: "apply"

Мы можем оборачивать в прокси и функции.

Ловушка `apply(target, thisArg, args)` активируется при вызове прокси как функции:

- `target` -- это оригинальный объект (как мы помним, функция - это объект в языке JavaScript),
- `thisArg` -- это контекст `this`.
- `args` -- список аргументов.

Например, декоратор `delay(f, ms)`.

Вызов `delay(f, ms)` возвращал функцию, которая передает вызовы `f` после `ms` миллисекунд.

Реализация на основе функции:

```js run
function delay(f, ms) {
    // возвращает обёртку, которая вызывает функцию f через таймаут
    return function() { // (*)
        setTimeout(f.apply(this, arguments), ms);
    };
}

function sayHi(user) {
    alert(`Привет, ${user}!`)
}

// после обёртки вызовы sayHi будут сработывать с задержкой в 3 секунды
sayHi = delay(sayHi, 3000);

sayHi('John'); // // Привет, John! (через 3 секунды)
```

Как мы уже видели, это в целом работает. Функция-обёртка в строке `(*)` вызывает нужную функцию с указанной задержкой.

Но наша функция-обёртка не перенаправляет операции чтения/записи свойства и другие. После обёртывания доступ к свойствам оригинальной функции, таким как `name`, `length`, и другим, будет потерян.

```js run
function delay(f, ms){
    return function() {
        setTimeout(f.apply(this, arguments), ms);
    };
}

function sayHi(user) {
    alert('Hello, ' + user);
}

sayHi = delay(sayHi, 3000);

alert(sayHi.length); // 0 (в объявлении функции-обёртки ноль аргументов)
```

Прокси куда более мощные в этом смысле, поскольку они перенаправляют всё к оригинальному объекту.

Давайте используем прокси вместо функции-обёртки:

```js run
function delay(f, ms) {
    return new Proxy(f, {
        apply(target, thisArgs, args) {
            setTimeout(() => target.apply(thisArg, args), ms);
        }
    });
}

function sayHi(name) {
    alert('Hello, ' + name);
}

sayHi = delay(sayHi, 3000);

alert(sayHi.length); // 1 (*) прокси перенаправляет чтение свойства length на исходную функцию

sayHi('John'); // Hello, John (через 3 секунды)
```

Результат такой же, но сейчас не только вызовы, но и другие операции на прокси перенаправляются к оригинальной функции. Таким образом, операция чтения свойства `sayHi.length` возвращает корректное значение в строке `(*)` после проксирования.

Мы получили лучшую обёртку.

Существуют и другие ловушки: полный список есть в начале этой главы. Использовать их можно по аналогии с вышеописанными.


## Reflect

`Reflect` - встроенный объект, упрощающий создание прокси.

Ранее мы говорили о том, что внутренние методы, такие как `[[Get]]`, `[[Set]]` и другие, существуют только в спецификации, что к ним нельзя обратиться напрямую.

Объект `Reflect` делает это возможным. Его методы - минимальные обёртки вокруг внутренних методов.

Вот примеры операций и вызовы `Reflect`, которые делают то же самое:

| Операция |  Вызов `Reflect` | Внутренний метод |
|-----------------|----------------|-------------|
| `obj[prop]` | `Reflect.get(obj, prop)` | `[[Get]]` |
| `obj[prop] = value` | `Reflect.set(obj, prop, value)` | `[[Set]]` |
| `delete obj[prop]` | `Reflect.deleteProperty(obj, prop)` | `[[HasProperty]]` |
| `new F(value)` | `Reflect.construct(F, value)` | `[[Construct]]` |
| ... | ... | ... |

Например:

```js run
let user = {};

Reflect.set(user, 'name', 'John');

alert(user.name); // John
```

В частности, `Reflect` позволяет вызвать операторы (`new`, `delete`...) как функции (`Reflect.construct`, `Reflect.deleteProperty`, ...). Это интересная возможность, но здесь нам важно другое.

**Для каждого внутреннего метода, перехватываемого `Proxy`, есть соответствующий метод в `Reflect`, который имеет такое же имя и те же аргументы, что и у ловушки `Proxy`.**

Поэтому мы можем использовать `Reflect`, чтобы перенаправить операцию на исходный объект.

В этом примере обе ловушки `get` и `set` прозрачно (как будто их нет) перенаправляют операции чтения и записи на объект, при этом выводя сообщение:

```js run
let user = {
    name: John
};

user = new Proxy(user, {
    get(target, prop, receiver) {
        alert('GET ' + prop);
        return Reflect.get(taget, prop, reciever); // (1)
    }, 
    set(target, prop, value, reciever) {
        alert(`SET ${prop} = ${value});
        return Reflect.set(target, prop, value, reciever); // (2)
    }
});

let name = user.name; // выводит "GET name"
user.name = 'Fred'; // выводит "SET name = Fred"
```

Здесь:

1. `Reflect.get` читает свойство объекта.
2. `Reflect.set` записывает свойство и возвращает `true` при успехе, иначе `false`.

То есть, всё очень просто - если ловушка хочет перенаправить вызов на объект, то достаточно вызвать `Reflect.<метод>` с теми же аргументами.

В большинстве случаев мы можем сделать всё то же самое и без `Reflect`, например, чтение свойства `Reflect.get(target, prop, receiver)` можно заменить на `target[prop]`. Но некоторые нюансы легко упустить.

### Прокси для геттера

Рассмотрим конкретный пример, демонстрирующий, чем лучше `Reflect.get`, и заодно разберёмся, зачем в `get/set` нужен четвёртый аргумент `receiver`, мы его ранее не использовали.

Допустим, у нас есть объект `user` со свойством `_name` и геттером для него.

Сделаем вокруг `user` прокси:

```js run
let user = {
    _name = 'Guest',
    get name(){
        return this._name;
    }
};

let userProxy = new Proxy(user, {
    get(target, prop){
        return target[prop];
    }
});

alert(userProxy.name); // Guest

```

Ловушка `get` здесь "прозрачная", она возвращает свойство исходного объекта и больше ничего не делает. Для нашего примера этого вполне достаточно.

Казалось бы, всё в порядке. Но давайте немного усложним пример.

Если мы унаследуем от проксированного `user` объект `admin`, то мы увидим, что он ведёт себя некорректно:

```js run
let user = {
  _name: "Гость",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) {
    return target[prop]; // (*) target = user
  }
});

let admin = {
    __proto__: userProxy,
    _name: 'Admin'
};

// Ожидается: 'Admin'
alert(admin.name); // выводится Guest
```

Но если убрать прокси, то всё будет работать как ожидается.

На самом деле, проблема в прокси, в строке `(*)`.

1. При чтении `admin.name`, так как в объекте `admin` нет свойства `name`, оно ищется в прототипе.
2. Прототипом является прокси `userProxy`.
3. При чтении из прокси свойства `name` срабатывает ловушка `get` и возвращает его из исходного объекта как `target[prop]` в строке `(*)`.

    Вызов `target[prop]`, если `prop` - это геттер, запускает его код в контексте `this=target`. Поэтому результатом является `this._name` из исходного объекта `target`, то есть из `user`.

Именно для исправления таких ситуаций нужен `receiver`, третий аргумент ловушки `get`. В нём хранится ссылка на правильный контекст `this`, который нужно передать геттеру. В данном случае это `admin`.

Как передать геттеру контекст? Для обычной функции мы могли бы использовать `call/apply`, но это же геттер, его не вызывают, просто читают значение.

Это может сделать `Reflect.get`. Всё будет работать верно, если использовать его.

Вот исправленный вариант:

```js run
let user = {
    _name: 'Guest',
    get name() {
        return this._name;
    }
};

let userProxy = new Proxy(user, {
    get(target, prop, receiver) {
        // reciever = admin
        return Reflect.get(target, prop, reciever); // (*)
    }
});
```

Сейчас `receiver`, содержащий ссылку на корректный `this` (то есть на `admin`), передаётся геттеру посредством `Reflect.get` в строке `(*)`.

Можно переписать ловушку и короче:

```js
get(taget, prop, receiver) {
    return Reflect.get(...argument);
}
```

Методы в `Reflect` имеют те же названия, что и соответствующие ловушки, и принимают такие же аргументы. Это было специально задумано при разработке спецификации JavaScript.

Так что `return Reflect...` даёт простую и безопасную возможность перенаправить операцию на оригинальный объект и при этом предохраняет нас от возможных ошибок, связанных с этим действием.

## Ограничения прокси

Прокси -- уникальное средство для настройки поведения объектов на самом низком уровне. Но они не идеальны, есть некоторые ограничения.

### Встроенные объекты: внутренние слоты

Многие встроенные объекты, например `Map`, `Set`, `Date`, `Promise` и другие используют так называемые "внутренние слоты".

Это как свойства, но только для внутреннего использования в самой спецификациии. Например, `Map` хранит элементы во внутреннем слоте `[[MapData]]`. Встроенные методы обращаются к слотам напрямую, не через `[[Get]]/[[Set]]`. Таким образом, прокси не может перехватить их.

Если встроенный объект проксируется, то в прокси не будет этих "внутренних слотов", так что попытка вызвать на таком прокси встроенный метод приведёт к ошибке.

Пример:

```js run
let map = new Map();

let proxy = new Proxy(map, {});

proxy.set('test', 1); // будет ошибка

```

Внутри себя объект типа `Map` хранит все данные во внутреннем слоте `[[MapData]]`. Прокси не имеет такого слота. [Встроенный метод `Map.prototype.set`](https://tc39.es/ecma262/#sec-map.prototype.set) пытается получить доступ к своему внутреннему свойству `this.[[MapData]]`, но так как `this=proxy`, то не может его найти и завершается с ошибкой.

Есть способ исправить это:

```js run
let map = new Map();

let proxy = new Proxy(map, {
    get(taget, prop, reciever){
        let value = Reflect.get(...arguments);
        return (typeof value === function) ? value.bind(target) : value;

    }
});

proxy.set('test', 1);
alert(proxy.get('test')); // 1 (работает)

Сейчас всё сработало, потому что `get` привязывает свойства-функции, такие как `map.set`, к оригинальному объекту `map`. Таким образом, когда реализация метода `set` попытается получить доступ к внутреннему слоту `this.[[MapData]]`, то всё пройдёт благополучно.

###"Объект `Array` не использует внутренние слоты"

Важным исключением является встроенный объект `Array`: он не использует внутренние слоты. Так сложилось исторически, ведь массивы были добавлены в язык очень давно.

То есть описанная выше проблема не возникает при проксировании массивов.

### Приватные поля

Нечто похожее происходит и с приватными полями классов.

Например, метод `getName()` осуществляет доступ к приватному полю `#name`, после проксирования он перестаёт работать:

```js run
class User {
    #name = 'Guest';

    getName() {
        return this.#name;
    }
}

let user = new User();

user = new Proxy(user, {});

alert(user.getName()); // Ошибка
```

Причина всё та же: приватные поля реализованы с использованием внутренних слотов. JavaScript не использует `[[Get]]/[[Set]]` при доступе к ним.

В вызове `getName()` значением `this` является проксированный `user`, в котором нет внутреннего слота с приватными полями.

Решением, как и в предыдущем случае, является привязка контекста к методу:

```js run
class User {
    #name = 'Guest';

    getName(){
        return this.#name;
    }
}

let user = new User;

user = new Proxy(user, {
    get(target, prop, reciever){
        value = Reflect.get(...arguments);
        return (typeof value === function) ? value.bind(target) : value;
    }
});

alert(user.getName()); // Guest
```

Однако, такое решение имеет ряд недостатков, о которых уже говорилось: методу передаётся оригинальный объект, который может быть передан куда-то ещё, и это может поломать весь функционал проксирования.

### Прокси != оригинальный объект

Прокси и объект, который проксируется, являются двумя разными объектами.

Если мы используем оригинальный объект как ключ, а затем проксируем его, то прокси не будет найден:

```js run
let allUsers = new Set();
class User {
    constructor(name) {
        this.name = name;
        allUsers.add(this);
    }
}

let user = new User('John');

alert(allUsers.has(user)); // true

user = new Proxy(user, {});

alert(allUsers.has(user)); // false
```

Как мы видим, после проксирования не получается найти объект `user` внутри множества `allUsers`, потому что прокси -- это другой объект.

###"Прокси не перехватывают проверку на строгое равенство `===`"

Прокси способны перехватывать много операторов, например `new` (ловушка `construct`), `in` (ловушка `has`), `delete` (ловушка `deleteProperty`) и так далее.

Но нет способа перехватить проверку на строгое равенство. Объект строго равен только самому себе, и никаким другим значениям.

Так что все операции и встроенные классы, которые используют строгую проверку объектов на равенство, отличат прокси от изначального объекта. Прозрачной замены в данном случае не произойдёт.

## Отключаемые прокси

*Отключаемый* (revocable) прокси -- это прокси, который может быть отключён вызовом специальной функции.

Допустим, у нас есть какой-то ресурс, и мы бы хотели иметь возможность закрыть к нему доступ в любой момент.

Для того, чтобы решить поставленную задачу, мы можем использовать отключаемый прокси, без ловушек. Такой прокси будет передавать все операции на проксируемый объект, и у нас будет возможность в любой момент отключить это.

Синтаксис:

```js
let {proxy, revoke} = Proxy.revocable(target, handler)
```

Вызов возвращает объект с `proxy` и функцией `revoke`, которая отключает его.

Вот пример:

```js run
let object = {
    data: 'Important data'
};

let {proxy, revoke} = new Proxy.revocable(object, {});

// передаём прокси куда-нибудь вместо оригинального объекта...
alert(proxy.data); // Important data

// позже в коде
revoke();

// прокси больше не работает (отключён)
alert(proxy.data); // Ошибка
```

Вызов `revoke()` удаляет все внутренние ссылки на оригинальный объект из прокси, так что между ними больше нет связи, и оригинальный объект теперь может быть очищен сборщиком мусора.

Мы можем хранить функцию `revoke` в `WeakMap`, чтобы легко найти её по объекту прокси:

```js run
let revokes = new WeakMap();

let object = {
    data: 'Important data'
};

let {proxy, revoke} = Proxy.revocable(object, {});

revokes.set(proxy, revoke);

// ..позже в коде..
revoke = revoke.get(proxy);
revoke();

alert(proxy.data); // Ошибка (прокси отключён)
```

Преимущество такого подхода в том, что мы не должны таскать функцию `revoke` повсюду. Мы получаем её при необходимости из `revokes` по объекту прокси.

Мы использовали `WeakMap` вместо `Map`, чтобы не блокировать сборку мусора. Если прокси объект становится недостижимым (то есть на него больше нет ссылок), то `WeakMap` позволяет сборщику мусора удалить его из памяти вместе с соответствующей функцией `revoke`, которая в этом случае больше не нужна.

## Ссылки

- Спецификация: [Proxy](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots), [Reflect](https://tc39.es/ecma262/#sec-reflection).
- MDN: [Proxy](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Proxy), [Reflect](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Reflect).

## Итого

Прокси -- это обёртка вокруг объекта, которая "по умолчанию" перенаправляет операции над ней на объект, но имеет возможность перехватывать их.

Проксировать можно любой объект, включая классы и функции.

Синтаксис:

```js
let proxy = new Proxy(target, {
  /* ловушки */
});
```

...Затем обычно используют прокси везде вместо оригинального объекта `target`. Прокси не имеет собственных свойств или методов. Он просто перехватывает операцию, если имеется соответствующая ловушка, а иначе перенаправляет её сразу на объект `target`.

Мы можем перехватывать:
- Чтение (`get`), запись (`set`), удаление (`deleteProperty`) свойства (даже несуществующего).
- Вызов функции (`apply`).
- Оператор `new` (ловушка `construct`).
- И многие другие операции (полный список приведён в начале статьи, а также в [документации](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Proxy)).

Это позволяет нам создавать "виртуальные" свойства и методы, реализовывать значения по умолчанию, наблюдаемые объекты, функции-декораторы и многое другое.

Мы также можем оборачивать один и тот же объект много раз в разные прокси, добавляя ему различные аспекты функциональности.

[Reflect](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Reflect) API создано как дополнение к [Proxy](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Proxy). Для любой ловушки из `Proxy` существует метод в `Reflect` с теми же аргументами. Нам следует использовать его, если нужно перенаправить вызов на оригинальный объект.

Прокси имеют некоторые ограничения:

- Встроенные объекты используют так называемые "внутренние слоты", доступ к которым нельзя проксировать. Однако, ранее в этой главе был показан один способ, как обойти это ограничение.
- То же самое можно сказать и о приватных полях классов, так как они реализованы на основе слотов. То есть вызовы проксированных методов должны иметь оригинальный объект в качестве `this`, чтобы получить к ним доступ.
- Проверка объектов на строгое равенство `===` не может быть перехвачена.
- Производительность: конкретные показатели зависят от интерпретатора, но в целом получение свойства с помощью простейшего прокси занимает в несколько раз больше времени. В реальности это имеет значение только для некоторых "особо нагруженных" объектов.