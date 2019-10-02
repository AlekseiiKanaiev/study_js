## Типы данных

В JavaScript используется динамическая типизация - это значит, что типы данных существуют, но переменные не привязаны ни к одному из них.
Существует 7 типов данных:
1) Число (number)
Представляет как целочисленные значения, так и числа с плавающей точкой.
Кроме обычных чисел существуют так называемые "специпльные числовые значения": Infinity, -Infinity, NaN(not a number).
-Infinity - математическая бесконечноость;
-NaN - означает вычислительную ошибку. Это результат неправильной или не определенной математичесской операции, например:
alert("text"\2);

Любая операция с NaN возвращает NaN.

2) Строка (string)
Синтакситечски должна заключаться в кавычки "" или '' или ``.

Двойные или одинарные кавычки являются "простыми", между ними нет никакой разницы (но на практике чаще применяются одинарные).
Обратные кавычки применяются при интерполяции другого выражения (переменных) в строку:
```js run
let name = "Dave";
alert(`hello ${name}`)
alert(`calculating ${1+5}`)
```

В отличии от некоторых других языков в JS нет типа для отдельного символа (сhar в С).

3) Булевый (логический) тип (bool)

Может принимать только 2 значения: `true` (истина) и `false`(ложь).

Обычно используется для хранения состояния.
Также может быть результатом сравнения.

4) Значение `null`
Специальное значение `null` содержит только значение `null`, представляет собой "ничего" или "пусто", "занчение не известно".
В JS `null` не я вляется ссылкой на "несуществующий объект" или "нулевым указателем", как в текоторых других языках.

5) Значение `undefined`
Специальное значение `undefined` также как и `null` формирует тип из самого себя.
Это означает, что значение не было присвоено.
Пример:
```js run
let x;
alert(x); // undefined
```

Также мы можем присвоить значение `undefined` любой переменной.
Обычно используется для проверок, была ли определена переменная.

6) Объекты (object)
Все типы выше называются примитивными, так как их значения могут быть только простые значения.
Объекты же используются для хранения коллекций данных или других объектов.

7) Символ (symbol)
Символ используется для создания уникальных идентификаторов объектов.

### Операци `typeof`
Возвращает строку с типом аргумента.
Существует 2 синтаксиса:
- `typeof х`;
- `typeof(х)`.

Существует официально признаная ошибка: typeof(null) возвращает object.