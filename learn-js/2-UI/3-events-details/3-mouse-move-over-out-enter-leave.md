# Движение мыши: mouseover/out, mouseenter/leave

В этой главе мы более подробно рассмотрим события, возникающие при движении указателя мыши над элементами страницы.

## События mouseover/mouseout, relatedTarget

Событие `mouseover` происходит в момент, когда курсор оказывается над элементом, а событие `mouseout` -- в момент, когда курсор уходит с элемента.

Эти события являются особенными, потому что у них имеется свойство `relatedTarget`. Оно "дополняет" `target`. Когда мышь переходит с одного элемента на другой, то один из них будет `target`, а другой `relatedTarget`.

Для события `mouseover`:

- `event.target` -- это элемент, *на который* курсор перешёл.
- `event.relatedTarget` -- это элемент, *с которого* курсор ушёл (`relatedTarget` -> `target`).

Для события `mouseout` наоборот:

- `event.target` -- это элемент, *с которого* курсор ушёл.
- `event.relatedTarget` -- это элемент, *на который* курсор перешёл (`target` -> `relatedTarget`).

### "Свойство `relatedTarget` может быть `null`"

Это нормально и означает, что указатель мыши перешёл не с другого элемента, а из-за пределов окна браузера. Или же, наоборот, ушёл за пределы окна.

Следует держать в уме такую возможность при использовании `event.relatedTarget` в своём коде. Если, например, написать `event.relatedTarget.tagName`, то при отсутствии `event.relatedTarget` будет ошибка.

## Пропуск элементов

Событие `mousemove` происходит при движении мыши. Однако, это не означает, что указанное событие генерируется при прохождении каждого пикселя.

Браузер периодически проверяет позицию курсора и, заметив изменения, генерирует события `mousemove`.

Это означает, что если пользователь двигает мышкой очень быстро, то некоторые DOM-элементы могут быть пропущены.

Если курсор мыши передвинуть очень быстро с элемента `#FROM` на элемент `#TO`, как это показано выше, то лежащие между ними элементы `<div>` (или некоторые из них) могут быть пропущены. Событие `mouseout` может запуститься на элементе `#FROM` и затем сразу же сгенерируется `mouseover` на элементе `#TO`.

Это хорошо с точки зрения производительности, потому что если промежуточных элементов много, вряд ли мы действительно хотим обрабатывать вход и выход для каждого.

С другой стороны, мы должны иметь в виду, что указатель мыши не "посещает" все элементы на своём пути. Он может и "прыгать".

В частности, возможно, что указатель запрыгнет в середину страницы из-за пределов окна браузера. В этом случае значение `relatedTarget` будет `null`, так как курсор пришёл "из ниоткуда".

### "Если был `mouseover`, то будет и `mouseout`"

Несмотря на то, что при быстрых переходах промежуточные элементы могут игнорироваться, в одном мы можем быть уверены: элемент может быть пропущен только целиком.

Если указатель "официально" зашёл на элемент, то есть было событие `mouseover`, то при выходе с него обязательно будет `mouseout`.

## Событие mouseout при переходе на потомка

Важная особенность события `mouseout` - оно генерируется в том числе, когда указатель переходит с элемента на его потомка.

То есть, визуально указатель всё ещё на элементе, но мы получим `mouseout`!

**По логике браузера, курсор мыши может быть только над одним элементом в любой момент времени - над самым глубоко вложенным и верхним по z-index.**

Таким образом, если курсор переходит на другой элемент (пусть даже дочерний), то он покидает предыдущий.

Обратите внимание на важную деталь.

Событие `mouseover`, происходящее на потомке, всплывает. Поэтому если на родительском элементе есть такой обработчик, то оно его вызовет.

При переходе с родителя элемента на потомка - на родителе сработают два обработчика: и `mouseout` и `mouseover`:

```js
parent.onmouseout = function(event) {
  /* event.target: внешний элемент */
};
parent.onmouseover = function(event) {
  /* event.target: внутренний элемент (всплыло) */
};
```

Если код внутри обработчиков не смотрит на `target`, то он подумает, что мышь ушла с элемента `parent` и вернулась на него обратно. Но это не так! Мышь никуда не уходила, она просто перешла на потомка.

Если при уходе с элемента что-то происходит, например, запускается анимация, то такая интерпретация происходящего может давать нежелательные побочные эффекты.

Чтобы этого избежать, можно смотреть на `relatedTarget` и, если мышь всё ещё внутри элемента, то игнорировать такие события..

## События mouseenter и mouseleave

События `mouseenter/mouseleave` похожи на `mouseover/mouseout`. Они тоже генерируются, когда курсор мыши переходит на элемент или покидает его.

Но есть и пара важных отличий:

1. Переходы внутри элемента, на его потомки и с них, не считаются.
2. События `mouseenter/mouseleave` не всплывают.

События `mouseenter/mouseleave` предельно просты и понятны.

Когда указатель появляется над элементом -- генерируется `mouseenter`, причём не имеет значения, где именно указатель: на самом элементе или на его потомке.

Событие `mouseleave` происходит, когда курсор покидает элемент.

## Делегирование событий

События `mouseenter/leave` просты и легки в использовании. Но они не всплывают. Таким образом, мы не можем их делегировать.

Представьте ситуацию, когда мы хотим обрабатывать события, сгенерированные при движении курсора по ячейкам таблицы. И в таблице сотни ячеек.

Очевидное решение -- определить обработчик на родительском элементе `<table>` и там обрабатывать возникающие события. Но, так как `mouseenter/leave` не всплывают, то если событие происходит на ячейке `<td>`, то только обработчик на `<td>` может поймать его.

Обработчики событий `mouseenter/leave` на `<table>` срабатывают, если курсор оказывается над таблицей в целом или же уходит с неё. Невозможно получить какую-либо информацию о переходах между ячейками внутри таблицы.

Что ж, не проблема -- будем использовать `mouseover/mouseout`.

Начнём с простых обработчиков, которые выделяют текущий элемент под указателем мыши:

```js
// выделим элемент под мышью
table.onmouseover = function(event) {
  let target = event.target;
  target.style.background = 'pink';
};

table.onmouseout = function(event) {
  let target = event.target;
  target.style.background = '';
};
```

В нашем случае мы хотим обрабатывать переходы именно между ячейками `<td>`: вход на ячейку и выход с неё. Прочие переходы, в частности, внутри ячейки `<td>` или вообще вне любых ячеек, нас не интересуют, хорошо бы их отфильтровать.

Можно достичь этого так:

- Запоминать текущую ячейку `<td>` в переменную, которую назовём `currentElem`.
- На `mouseover` -- игнорировать событие, если мы всё ещё внутри той же самой ячейки `<td>`.
- На `mouseout` -- игнорировать событие, если это не уход с текущей ячейки `<td>`.

## Итого

Мы рассмотрели события `mouseover`, `mouseout`, `mousemove`, `mouseenter` и `mouseleave`.

Особенности, на которые стоит обратить внимание:

- При быстром движении мыши события не будут возникать на промежуточных элементах.
- События `mouseover/out` и `mouseenter/leave` имеют дополнительное свойство: `relatedTarget`. Оно дополняет свойство `target` и содержит ссылку на элемент, с/на который мы переходим.

События `mouseover/out` возникают, даже когда происходит переход с родительского элемента на потомка. С точки зрения браузера, курсор мыши может быть только над одним элементом в любой момент времени - над самым глубоко вложенным.

События `mouseenter/leave` в этом отличаются. Они генерируются, когда курсор переходит на элемент в целом или уходит с него. Также они не всплывают.
