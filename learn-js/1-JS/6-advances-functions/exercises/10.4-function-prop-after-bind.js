function f(){
    console.log(this.name);
}

f.test = 5;

let t = f;
console.log(t.test);

t = f.bind({name:'alex'})

console.log(t.test); // undefined
/**Результатом работы `bind` является другой объект. У него уже нет свойства `test`. */