# Свойства - геттеры и сеттеры

Есть два типа свойств объекта.

Первый тип это *свойства-данные (data properties)*. Мы уже знаем, как работать с ними. Все свойства, которые мы использовали до текущего момента были свойствами-данными.

Второй тип свойств мы ещё не рассматривали. Это *свойства-аксессоры (accessor properties)*. По своей сути это функции, которые используются для присвоения и получения значения, но во внешнем коде они выглядят как обычные свойства объекта.

## Геттеры и сеттеры

Свойства-аксессоры представлены методами: "геттер" - для чтения и "сеттер" - для записи. При литеральном объявлении объекта они обозначаются `get` и `set`:

```js
let obj = {
  *!*get propName()*/!* {
    // геттер, срабатывает при чтении obj.propName
  },

  *!*set propName(value)*/!* {
    // сеттер, срабатывает при записи obj.propName = value
  }
};
```

Геттер срабатывает, когда `obj.propName` читается, сеттер -- когда значение назначается.

Например, у нас есть объект `user` со свойствами `name` и `surname`:

```js run
let user = {
  name: "John",
  surname: "Smith"
};
```

А теперь добавим свойство объекта `fullName` для полного имени, которое в нашем случае: `"John Smith"`. Само собой, мы не хотим дублировать уже имеющуюся информацию, так что реализуем его при помощи аксессора:

```js run
let user = {
  name: "John",
  surname: "Smith",

*!*
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
*/!*
};

*!*
alert(user.fullName); // John Smith
*/!*
```

Снаружи свойство-аксессор выглядит как обычное свойство. В этом и заключается смысл свойств-аксессоров. Мы не *вызываем* `user.fullName` как функцию, а *читаем* как обычное свойство: геттер выполнит всю работу за кулисами.

```js run
let user = {
  get fullName() {
    return `...`;
  }
};

*!*
user.fullName = "Тест"; // Ошибка (у свойства есть только геттер)
*/!*
```

Давайте исправим это, добавив сеттер для `user.fullName`:

```js run
let user = {
  name: "John",
  surname: "Smith",

  get fullName() {
    return `${this.name} ${this.surname}`;
  },

*!*
  set fullName(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
};

// set fullName запустится с данным значением
user.fullName = "Alice Cooper";

alert(user.name); // Alice
alert(user.surname); // Cooper
```

В итоге мы получили "виртуальное" свойство `fullName`. Его можно прочитать и изменить, но по факту его не существует.

"Нет поддержки для `delete`"
При попытке удалить свойство-аксессор оператором `delete` будет ошибка.

## Дескрипторы свойств доступа

Дескрипторы свойств-аксессоров отличаются от "обычных" свойств-данных.

Свойства-аксессоры не имеют `value` и `writable`, но взамен предлагают функции `get` и `set`.

То есть, дескриптор аксессора может иметь:

- **`get`** -- функция без аргументов, которая сработает при чтении свойства,
- **`set`** -- функция, принимающая один аргумент, вызываемая при присвоении свойства,
- **`enumerable`** -- то же самое, что и для свойств-данных,
- **`configurable`** -- то же самое, что и для свойств-данных.

Например, для создания аксессора `fullName` при помощи `defineProperty` мы можем передать дескриптор с использованием `get` и `set`:

```js run
let user = {
  name: "John",
  surname: "Smith"
};

*!*
Object.defineProperty(user, 'fullName', {
  get() {
    return `${this.name} ${this.surname}`;
  },

  set(value) {
    [this.name, this.surname] = value.split(" ");
  }
*/!*
});

alert(user.fullName); // John Smith

for(let key in user) alert(key); // name, surname
```

Ещё раз заметим, что свойство объекта может быть только свойством-аксессором (с методами `get/set`) или свойством-данных (со значением `value`).

При попытке указать и `get` и `value` в одном дескрипторе будет ошибка:

```js run
*!*
// Error: Invalid property descriptor.
*/!*
Object.defineProperty({}, 'prop', {
  get() {
    return 1
  },

  value: 2
});
```

## Умные геттеры/сеттеры

Геттеры/сеттеры можно использовать как обёртки над "реальными" значениями свойств, чтобы получить больше контроля над операциями с ними.

Например, если мы хотим запретить устанавливать короткое имя для `user`, мы можем использовать сеттер `name` для проверки, а само значение хранить в отдельном свойстве `_name`:

```js run
let user = {
  get name() {
    return this._name;
  },

  set name(value) {
    if (value.length < 4) {
      alert("Имя слишком короткое, должно быть более 4 символов");
      return;
    }
    this._name = value;
  }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = ""; // Имя слишком короткое...
```

Таким образом, само имя хранится в `_name`, доступ к которому производится через геттер и сеттер.

Технически, внешний код всё ещё может получить доступ к имени напрямую с помощью `user._name`, но существует широко известное соглашение о том, что свойства, которые начинаются с символа `"_"`, являются внутренними, и к ним не следует обращаться извне пределов объекта.

## Использование для совместимости

У аксессоров есть интересная область применения - они позволяют в любой момент взять "обычное" свойство и изменить его поведение, поменяв на геттер и сеттер.

Например, представим, что мы начали реализовывать объект `user`, используя свойства-данные имя `name` и возраст `age`:

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

let john = new User("John", 25);

alert( john.age ); // 25
```

...Но рано или поздно всё может измениться. Взамен возраста `age` мы можем решить хранить дату рождения `birthday`, потому что так более точно и удобно:


```js
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
}

let john = new User("John", new Date(1992, 6, 1));
```

Что нам делать со старым кодом, который использует свойство `age`?

Мы можем попытаться найти все такие места и изменить их, но это отнимает время и может быть невыполнимо, если код был используется многими другими людьми.

Добавление геттера для `age` решит проблему:

```js run no-beautify
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;

*!*
  // возраст рассчитывается из текущей даты и дня рождения
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
*/!*
}

let john = new User("John", new Date(1992, 6, 1));

alert( john.birthday ); // доступен как день рождения
alert( john.age );      // ...так и возраст
```

Теперь старый код тоже работает, и у нас есть отличное дополнительное свойство.
