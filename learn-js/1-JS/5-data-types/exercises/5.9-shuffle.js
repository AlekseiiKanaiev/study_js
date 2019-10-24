function shuffle(arr){
    for (let i = 0; i < arr.length; i++){
        let randInd = Math.floor(Math.random()*(arr.length-i)+i);
        [arr[randInd], arr[i]] = [arr[i], arr[randInd]];
    }
    return arr;
}


let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(shuffle(arr));

function shuffleFisher(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

// подсчёт вероятности для всех возможных вариантов
let count = {
    '123': 0,
    '132': 0,
    '213': 0,
    '231': 0,
    '321': 0,
    '312': 0
};
  
for (let i = 0; i < 1000000; i++) {
    let array = [1, 2, 3];
    shuffle(array);
    count[array.join('')]++;
}

// показать количество всех возможных вариантов
for (let key in count) {
    console.log(`${key}: ${count[key]}`);
}