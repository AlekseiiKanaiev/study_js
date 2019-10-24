function toCamelCase(str){
    return str.replace(/-./g, (match) => match[1].toUpperCase());
}

console.log(toCamelCase("background-color"));
console.log(toCamelCase("list-style-image"));
console.log(toCamelCase("-webkit-transition"));

function camelize(str) {
    return str
      .split('-') // разбивает 'my-long-word' на массив ['my', 'long', 'word']
      .map(
        // Переводит в верхний регистр первые буквы всех элементом массива за исключением первого
        // превращает ['my', 'long', 'word'] в ['my', 'Long', 'Word']
        (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
      )
      .join(''); // соединяет ['my', 'Long', 'Word'] в 'myLongWord'
  }

console.log(camelize("-webkit-transition"));