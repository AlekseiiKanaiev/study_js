let i = 0;
let c = 0;
let start = Date.now();

function count() {

  // перенесём планирование очередного вызова в начало
  if (i < 1e9 - 1e6) {
      c++;
    setTimeout(count); // запланировать новый вызов
  }

  do {
    i++;
  } while (i % 1e6 != 0);
  if (i == 1e9) {
      console.log(c);
    console.log("Done in " + (Date.now() - start) + 'ms');
  }

}

count();