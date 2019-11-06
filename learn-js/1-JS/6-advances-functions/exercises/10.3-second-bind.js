function f() {
    console.log(this.name);
}

let user1 = {
    name: 'Alex'
}

let user2 = {
    name: 'John'
}

f = f.bind(user1).bind(user2);

f();
/**Экзотический объект [bound function](https://tc39.github.io/ecma262/#sec-bound-function-exotic-objects), возвращаемый при первом вызове `f.bind(...)`, запоминает контекст (и аргументы, если они были переданы) только во время создания.

Следующий вызов `bind` будет устанавливать контекст уже для этого объекта. Это ни на что не повлияет.

Можно сделать новую привязку, но нельзя изменить существующую.
 */