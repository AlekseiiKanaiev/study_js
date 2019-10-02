// the global Array
var s = [23, 65, 98, 5];

Array.prototype.myMap = function(callback){
  var newArray = [];
  // Add your code below this line
//   Use for cycle:
//   for (let i = 0; i < this.length; i++){
//     newArray.push(callback(this[i]))
//   }
//Or for...of:
// for (let el of this){
//     newArray.push(callback(el))
// }
// Or use forEach method:
  this.forEach(el => newArray.push(callback(el)));
  // Add your code above this line
  return newArray;
};

var new_s = s.myMap(function(item){
    console.log(item);
  return item * 2;
});

console.log(new_s)