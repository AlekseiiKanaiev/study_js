# Поиск: getElement*, querySelector*

Свойства навигации по DOM хороши, когда элементы расположены рядом. А что, если нет? Как получить произвольный элемент страницы?

Для этого в DOM есть дополнительные методы поиска.

## document.getElementById или просто id

Когда у элемента есть атрибут `id`, значение атрибута используется в качестве имени глобальной переменной.

С её помощью мы можем обратиться к элементу напрямую:

```html run
<div id = "elem">
    <div id = "elem-content">Element</div>
</div>

<script>
    alert(elem); // DOM-элемент с id="elem"
    alert(window.elem); // такой доступ к глобальной переменной тоже работает
    alert(window['elem-content']); // доступнo через квадратные скобки [...]
</script>
```

Это поведение соответствует [стандарту](http://www.whatwg.org/specs/web-apps/current-work/#dom-window-nameditem), но поддерживается в основном для совместимости, как осколок далёкого прошлого. Браузер пытается помочь нам, смешивая пространства имён JS и DOM. Это подходит для простого кода, но возможны конфликты. Когда мы работаем с JS-кодом, не видя HTML, не очевидно, откуда возьмётся переменная.

Если мы объявляем переменную с тем же именем, она будет иметь приоритет:

```html run
<div id = "elem"></div>
<script>
    let elem = 5;
    alert(elem); // 5
</script>
```

Лучшая альтернатива - использовать специальный метод `document.getElementById(id)`.

Например:

```html run
<div id = "elem">
    <div id = "elem-content">Element</div>
</div>

<script>
    let elem = document.getElementById('elem');
    elem.style.background = 'red';
</script>
```

### "Должен остаться только один"

Значение `id` должно быть уникальным. В документе может быть только один элемент с данным `id`.

Если в документе есть несколько элементов с одинаковым значением `id`, то поведение методов поиска непредсказуемо. Браузер может вернуть любой из них случайным образом. Поэтому, пожалуйста, придерживайтесь правила сохранения уникальности `id`.

### "Только `document.getElementById`, а не `anyNode.getElementById`"

Метод `getElementById` можно вызвать только для объекта `document`. Он осуществляет поиск по `id` по всему документу.

## querySelectorAll [#querySelectorAll]

Самый универсальный метод поиска - это `elem.querySelectorAll(css)`, он возвращает все элементы внутри `elem`, удовлетворяющие данному CSS-селектору.

Следующий запрос получает все элементы `<li>`, которые являются последними потомками в `<ul>`:

```html run
<ul>
    <li>Этот</li>
    <li>тест</li>
</ul>
<ul>
    <li>полностью</li>
    <li>пройден</li>
</ul>

<script>
    let elements = document.querySelectorAll('ul > li:last-child');
    for(let elem of elements) alert(elem); // "тест", "пройден" 
</script>
```

Этот метод действительно мощный, потому что можно использовать любой CSS-селектор.

### "Псевдоклассы тоже работают"

Псевдоклассы в CSS-селекторе, в частности `:hover` и `:active`, также поддерживаются. Например, `document.querySelectorAll(':hover')` вернёт коллекцию (в порядке вложенности: от внешнего к внутреннему) из текущих элементов под курсором мыши.

## querySelector [#querySelector]

Метод `elem.querySelector(css)` возвращает первый элемент, соответствующий данному CSS-селектору.

Иначе говоря, результат такой же, как при вызове `elem.querySelectorAll(css)[0]`, но он сначала найдёт *все* элементы, а потом возьмёт первый, в то время как `elem.querySelector` найдёт только первый и остановится. Это быстрее, кроме того, его короче писать.

## matches
Предыдущие методы искали по DOM.

Метод [elem.matches(css)](http://dom.spec.whatwg.org/#dom-element-matches) ничего не ищет, а проверяет, удовлетворяет ли `elem` CSS-селектору, и возвращает `true` или `false`.

Этот метод удобен, когда мы перебираем элементы (например, в массиве или в чём-то подобном) и пытаемся выбрать те из них, которые нас интересуют.

Например:

```html run
<a href = "http://example.com/file.zip">...</a>
<a href = "http://ya.ru">...</a>

<script>
    // может быть любая коллекция вместо document.body.children
    for (let el of document.body.children){
        if (el.matches('a[href$="zip"]')) alert("Ссылка на архив: " + elem.href);
    }
</script>
```

## closest

*Предки* элемента - родитель, родитель родителя, его родитель и так далее. Вместе они образуют цепочку иерархии от элемента до вершины.

Метод `elem.closest(css)` ищет ближайшего предка, который соответствует CSS-селектору. Сам элемент также включается в поиск.

Другими словами, метод `closest` поднимается вверх от элемента и проверяет каждого из родителей. Если он соответствует селектору, поиск прекращается. Метод возвращает либо предка, либо `null`, если такой элемент не найден.

Например:

```html run
<h1>Содержание</h1>

<div class = "contents">
    <ul class = "book">
        <li class = "chapter">Chapter 1</li>
        <li class = "chapter">Chapter 2</li>
    </ul>
</div>

<script>    
    let chapter = document.querySelector('.chapter'); // li

    alert(chapter.closest('.book')); // ul
    alert(chapter.closest('.contents')); // div
    alert(chapter.closest('h1')); // null (потому что h1 - не предок) 
</script>
```

## getElementsBy*

Существуют также другие методы поиска элементов по тегу, классу и так далее.

На данный момент, они скорее исторические, так как `querySelector` более чем эффективен.

Здесь мы рассмотрим их для полноты картины, также вы можете встретить их в старом коде.

- `elem.getElementsByTagName(tag)` ищет элементы с данным тегом и возвращает их коллекцию. Передав `"*"` вместо тега, можно получить всех потомков.
- `elem.getElementsByClassName(className)` возвращает элементы, которые имеют данный CSS-класс.
- `document.getElementsByName(name)` возвращает элементы с заданным атрибутом `name`. Очень редко используется.

Например:
```js
// получить все элементы div в документе
lets divs = document.getElementsByTagName('div');
```

Давайте найдём все `input` в таблице:

```html run
<table id = "table">
    <tr>
        <td>Your age</td>
        <td>
            <lable>
                <input type = "radio" name = "age" value = "young" checked>
                younger 18
            </lable>
            <lable>
                <input type = "radio" name = "age" value = "mature" checked>
                between 18 and 50
            </lable>
            <lable>
                <input type = "radio" name = "age" value = "senior" checked>
                older 50
            </lable>
        </td>
    </tr>
</table>

<script>
    let inputs = table.getElementsByTagName('input');

    for (let input of inputs) alert(input.value + ': ' + input.checked)
</script>
```

### "Не забываем про букву `\"s\"`!"

Одна из самых частых ошибок начинающих разработчиков (впрочем, иногда и не только)  - это забыть букву `"s"`. То есть пробовать вызывать метод `getElementByTagName` вместо <code>getElement<b>s</b>ByTagName</code>.

Буква `"s"` отсутствует в названии метода `getElementById`, так как в данном случае возвращает один элемент. Но `getElementsByTagName` вернёт список элементов, поэтому `"s"` обязательна.

### "Возвращает коллекцию, а не элемент!"

Другая распространённая ошибка - написать:

```js
// не работает
document.getElementsByTagName('input').value = 5;
```

Попытка присвоить значение *коллекции*, а не элементам внутри неё, не сработает.

Нужно перебрать коллекцию в цикле или получить элемент по номеру и уже ему присваивать значение, например, так:

```js
// работает (если есть input)
document.getElementsByTagName('input')[0].value = 5;
```

Ищем элементы с классом `.article`:

```html run
<form name = "my-form">
    <div class = "article">Article</div>
    <div class = "long article">Long article</div>
</form>

<script>
    // ищем по имени атрибута
    let form = document.getElementsByName('my-form')[0];

    // ищем по классу внутри form
    let articles = form.getElementsByClassName('article');
    alert(articles.length); // 2
</script>
```

## Живые коллекции

Все методы `"getElementsBy*"` возвращают *живую* коллекцию. Такие коллекции всегда отражают текущее состояние документа и автоматически обновляются при его изменении.

Напротив, `querySelectorAll` возвращает *статическую* коллекцию. Это похоже на фиксированный массив элементов.

В приведённом ниже примере есть два скрипта.

1. Первый создаёт ссылку на коллекцию `<div>`. На этот момент её длина равна `1`.
2. Второй скрипт запускается после того, как браузер встречает ещё один `<div>`, теперь её длина - `2`.

Если мы будем использовать querySelectorAll, то оба скрипта вернут длину коллекции, равную `1`:

```html run
<div>First div</div>

<script>
    let getDivs = document.getElementByTagName('div');
    alert(getDivs.length); // 1
    let queryDivs = document.querySelectorAll('div');
    alert(queryDivs.length); // 1
</script>

<div>Second div</div>

<script>
    alert(getDivs); // 2
    alert(queryDivs); // 1
</script>
```

Теперь мы легко видим разницу. Длина статической коллекции не изменилась после появления нового `div` в документе.

## Итого

Есть 6 основных методов поиска элементов в DOM:

<table>
<thead>
<tr>
<td>Метод</td>
<td>Ищет по...</td>
<td>Ищет внутри элемента?</td>
<td>Возвращает живую коллекцию?</td>
</tr>
</thead>
<tbody>
<tr>
<td><code>querySelector</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>querySelectorAll</code></td>
<td>CSS-selector</td>
<td>✔</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementById</code></td>
<td><code>id</code></td>
<td>-</td>
<td>-</td>
</tr>
<tr>
<td><code>getElementsByName</code></td>
<td><code>name</code></td>
<td>-</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByTagName</code></td>
<td>tag or <code>'*'</code></td>
<td>✔</td>
<td>✔</td>
</tr>
<tr>
<td><code>getElementsByClassName</code></td>
<td>class</td>
<td>✔</td>
<td>✔</td>
</tr>
</tbody>
</table>

Безусловно, наиболее часто используемыми в настоящее время являются методы `querySelector` и `querySelectorAll`, но и методы  `getElementBy*` могут быть полезны в отдельных случаях, а также встречаются в старом коде.

Кроме того:

- Есть метод `elem.matches(css)`, который проверяет, удовлетворяет ли элемент CSS-селектору.
- Метод `elem.closest(css)` ищет ближайшего по иерархии предка, соответствующему данному CSS-селектору. Сам элемент также включён в поиск.

И, напоследок, давайте упомянем ещё один метод, который проверяет наличие отношений между предком и потомком:
-  `elemA.contains(elemB)` вернёт `true`, если `elemB` находится внутри `elemA` (`elemB` потомок `elemA`) или когда `elemA==elemB`.

