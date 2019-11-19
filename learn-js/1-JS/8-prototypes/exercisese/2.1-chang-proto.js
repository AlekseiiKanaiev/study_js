function Rabbit() {}
Rabbit.prototype = {
  eats: true
};

let rabbit = new Rabbit();

console.log( rabbit.eats ); // true

/**Присвоение нового значения свойству 
 * `Rabbit.prototype` влияет на 
 * `[[Prototype]]` вновь создаваемых 
 * объектов, но не на прототип уже 
 * существующих. */

Rabbit.prototype = {};
console.log( rabbit.eats ); // true

/**Объекты присваиваются по ссылке. 
 * Не создаётся копия `Rabbit.prototype`, 
 * это всегда один объект, на который 
 * ссылается и `Rabbit.prototype`, и 
 * `[[Prototype]]` объекта `rabbit`.
    Таким образом, когда мы изменяем этот 
    объект по одной ссылке, изменения видны 
    и по другой. */
Rabbit.prototype.eats = false;
console.log( rabbit.eats ); // false

/**Операция `delete` применяется к свойствам 
 * конкретного объекта, на котором она 
 * вызвана. Здесь `delete rabbit.eats` 
 * пытается удалить свойство `eats` из 
 * объекта `rabbit`, но его там нет. 
 * Таким образом, просто ничего не 
 * произойдёт. */
delete rabbit.eats;
console.log( rabbit.eats ); // true


/**Свойство `eats` удалено из прототипа, 
 * оно больше не существует. */
delete Rabbit.prototype.eats;
console.log( rabbit.eats ); // undefined

