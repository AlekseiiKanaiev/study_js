function Rabbit(name) {
    this.name = name;
}
Rabbit.prototype.sayHi = function() {
    console.log(this.name);
};
  
let rabbit = new Rabbit("Rabbit");

/**В первом вызове `this == rabbit`, 
 * так что только первый вызов выведет `Rabbit`*/
rabbit.sayHi();
/**во всех остальных `this` равен 
 * `Rabbit.prototype`, так как это объект 
 * перед точкой, так что вызов выведет `undefined` */
Rabbit.prototype.sayHi();
Object.getPrototypeOf(rabbit).sayHi();
rabbit.__proto__.sayHi();

