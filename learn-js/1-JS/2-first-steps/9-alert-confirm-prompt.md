# Взаимодействие: alert, prompt, confirm

Это функции интерфейса браузера.

## alert

Сиснаксис:
```js
let message = "Hello"
alert(message);
```
Этот код отобразит окно в браузере и приостановит дальнейшее выполнение скриптовЮ до тех пор пока пользователь не нажмет кнопку "ОК".

Это окно называется модальным окном. Модальное - означает, что пользователь не может взаимодействовать с интерыейсом остальной части страницы до тех пор, пока взыимодействует с модальным окном.

## prompt

Сиснаксис:
```js no-beautify
result = prompt(title, [default]);
```

Функция `prompt` принимает 2 аргумента:

1) `title` - текст для отображения в окне.
2) `default` - необязательный аргумент, который устанавливает начальное значение в поле для текста в окне.

Пользователь может напечатать что-то в поле ввода и нажать "ОК". Он также может отменить ввод нажатием кнопки "Отмена" или нажав клавишу `key:Esc`.

Вызов `prompt` вернет текст, указанный в поле для ввода, или  `null`, если ввод отменен пользователем.
Например:

```js run
let age = prompt('Сколько тебе лет?', 100);

alert(`Тебе ${age} лет!`); // Тебе 100 лет!
```

Для Internet Explorer взяегда нужно устанавливать значение по умалчанию иначе быдет установлено значение ubdefined.

## confirm

Синтаксис:

```js
result = confirm(question);
```

Функция отображает модальное окно с текстом вопроса и двумя кнопками "ОК" и "Отмена" и возвращает `true`, если нажата кнопка "ОК" или `false`, если нажата кнопка "Отмена".

Например:

```js run
let isBoss = confirm("Ты здесь главный?");

alert( isBoss ); // true если нажата OK
```
На все указанные методы распространяется два ограничения:
1) Расположение окон определяется браузером. Обычно окна находятся в центре.
2) Визуальное отображение оког зависит от браузера, и мы не можем изменить их вид.
