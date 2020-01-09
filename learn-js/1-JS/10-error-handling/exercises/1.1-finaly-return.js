function fib(n) {
    if (n < 0 || Math.trunc(n) != n) {
      throw new Error("Должно быть целое неотрицательное число");
    }
    return n <= 1 ? n : fib(n - 1) + fib(n - 2);
  }
  
  function getFib(){
      let num = 35;
      let result;
      let start = Date.now();
  
      try {
        result = fib(num);
        console.log(1);
        return result;
      } catch (e) {
          console.log(e);
        result = 0;
      } finally {
        console.log(`Выполнение заняло ${Date.now() - start}ms`);
      }
  }
  
  let result = getFib();
  console.log(2);
  console.log(result || "возникла ошибка");
  console.log(3);