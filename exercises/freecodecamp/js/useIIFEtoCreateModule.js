const funModule = (() => {
    return{
    isCuteMixin: (obj) => {
        obj.isCute = function() {
            return true;
        };
    },
    singMixin: (obj) => {
        obj.sing = function() {
            console.log("Singing to an awesome tune");
        };
    }
    }
})();

function Dog (name) {
    this.name = name;
}

funModule.singMixin(Dog);
funModule.isCuteMixin(Dog);

Dog.prototype.voice = () => console.log('Woof!!!');

for (let el in Dog){
    console.log(el);
}

console.log(Object.keys(Dog));

let hound = new Dog('Alex');


// for (let el in hound){
//     console.log(el);
// }
// funModule.singMixin(hound);
// funModule.isCuteMixin(hound)

console.log(hound.name);
hound.name = 'Gerta';

console.log(hound.name);
for (let el in hound){
    console.log(el);
}
console.log(Object.keys(hound));

hound.voice();
// hound.sing();
// hound.isCute();