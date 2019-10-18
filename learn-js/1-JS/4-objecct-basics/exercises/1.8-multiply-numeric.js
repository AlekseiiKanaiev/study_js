function multiplyNum(obj) {
    for (let key in obj){
        if (typeof(obj[key]) === 'number'){
            obj[key] *= 2;
        }
    }
    return obj;
}

let menu = {
    width: 200,
    height: 300,
    title: "My menu"
  };

let a = multiplyNum(menu);
console.log(a);