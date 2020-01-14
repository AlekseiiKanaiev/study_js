# Промисы: обработка ошибок

Цепочки промисов отлично подходят для перехвата ошибок. Если промис завершается с ошибкой, то управление переходит в ближайший обработчик ошибок. На практике это очень удобно.

Например, в представленном ниже примере для `fetch` указана неправильная ссылка (сайт не существует), и `.catch` перехватывает ошибку:

```js run
fetch('https://no-such-server.blabla') // ошибка
.then(response => response.json())
.catch(err => alert(err)) // TypeError: failed to fetch (текст может отличаться)
```

Как видно, `.catch` не обязательно должен быть сразу после ошибки, он может быть далее, после одного или даже нескольких `.then`

Или, может быть, с сервером всё в порядке, но в ответе мы получим некорректный JSON. Самый лёгкий путь перехватить все ошибки - это добавить `.catch` в конец цепочки:

```js run
fetch('/article/promise-chaining/user.json')
.then(response => response.json())
.then(user => fetch(`https://api.github.com/users/${user.name}`))
.then(ghUser => {
    return new Promise((res, rej) => {
        const img = document.createElement('img');
        img.src = ghUser.avatar_url;
        img.classNamme = 'promise-avatar-example';
        document.body.append(img);

        setTimeout(() => {
            img.remove();
            res(ghUser);
        }, 3000);
    });
})
.catch(err => alert(err.message));
```

Если все в порядке, то такой `.catch` вообще не выполнится. Но если любой из промисов будет отклонён (проблемы с сетью или некорректная json-строка, или что угодно другое), то ошибка будет перехвачена.

## Неявный try..catch

Вокруг функции промиса и обработчиков находится "невидимый `try..catch`". Если происходит исключение, то оно перехватывается, и промис считается отклонённым с этой ошибкой.

Например, этот код:

```js run
new Promise((res, rej) => {
    throw new Error('error!');
})
.catch(alert); // Error: error!
```

...Работает так же, как и этот:

```js run
new Promise((res, rej) => {
    rej(new Error('error!'));
})
.catch(alert); // Error: error!
```

"Невидимый `try..catch`" вокруг промиса автоматически перехватывает ошибку и превращает её в отклонённый промис.

Это работает не только в функции промиса, но и в обработчиках. Если мы бросим ошибку (`throw`) из обработчика (`.then`), то промис будет считаться отклонённым, и управление перейдёт к ближайшему обработчику ошибок.

Пример:

```js run
new Promise(res => res('ok!))
.then(result => {
    throw new Error('error!); // генерируем ошибку
})
.catch(alert); // Error: error!

Это происходит для всех ошибок, не только для тех, которые вызваны оператором `throw`. Например, программная ошибка:

```js run
new Promise(res => res('ok!'))
.then(res => {
    blalala(); // нет такой функции
})
.catch(alert) / ReferenceError: blabla is not defined
```

Финальный `.catch` перехватывает как промисы, в которых вызван `reject`, так и случайные ошибки в обработчиках.

## Пробрасывание ошибок

Как мы уже заметили, `.catch` ведёт себя как `try..catch`. Мы можем иметь столько обработчиков `.then`, сколько мы хотим, и затем использовать один `.catch` в конце, чтобы перехватить ошибки из всех обработчиков.

В обычном `try..catch` мы можем проанализировать ошибку и повторно пробросить дальше, если не можем её обработать. То же самое возможно для промисов.

Если мы пробросим (`throw`) ошибку внутри блока `.catch`, то управление перейдёт к следующему ближайшему обработчику ошибок. А если мы обработаем ошибку и завершим работу обработчика нормально, то продолжит работу ближайший успешный обработчик `.then`.

В примере ниже `.catch` успешно обрабатывает ошибку:

```js run
// the execution: catch -> then
new Promise((res, rej) => {
    throw new Error('error!');
})
.catch(error => alert('Ошибка обработана, продолжить работу'));
.then(() => alert('Управление перейдёт в следующий then'));
```

Здесь блок `.catch` завершается нормально. Поэтому вызывается следующий успешный обработчик `.then`.

В примере ниже мы видим другую ситуацию с блоком `.catch`. Обработчик `(*)` перехватывает ошибку и не может обработать её (например, он знает как обработать только `URIError`), поэтому ошибка пробрасывается далее:

```js run
// the execution: catch -> catch -> then
new Promise((res, rej) => {
    throw new Error('error!');
})
catch(err => {
    if(err instanceof URIError) {
        // обрабатываем ошибку
    } else {
        alert('Не могу обработать ошибку');
        throw error; // пробрасывает эту или другую ошибку в следующий catch
    }
})
.then(() => {
    /* не выполнится */
})
.catch(err => {
    alert(`Неизвестная ошибка: ${err}`); // ничего не возвращаем => выполнение продолжается в нормальном режиме
});
```

Управление переходит от первого блока `.catch` `(*)` к следующему `(**)`, вниз по цепочке.

## Необработанные ошибки

Что произойдёт, если ошибка не будет обработана? Например, мы просто забыли добавить `.catch` в конец цепочки, как здесь:

```js untrusted run refresh
new Promise(function() {
  noSuchFunction(); // Ошибка (нет такой функции)
})
  .then(() => {
    // обработчики .then, один или более
  }); // без .catch в самом конце!
```

В случае ошибки выполнение должно перейти к ближайшему обработчику ошибок. Но в примере выше нет никакого обработчика. Поэтому ошибка как бы "застревает", её некому обработать.

На практике, как и при обычных необработанных ошибках в коде, это означает, что что-то пошло сильно не так.

Что происходит, когда обычная ошибка не перехвачена `try..catch`? Скрипт умирает с сообщением в консоли. Похожее происходит и в случае необработанной ошибки промиса.

JavaScript-движок отслеживает такие ситуации и генерирует в этом случае глобальную ошибку. Вы можете увидеть её в консоли, если запустите пример выше.

В браузере мы можем поймать такие ошибки, используя событие `unhandledrejection`:

```js run
window.addEventListener('unhandledrejection', event => {
    // объект события имеет два специальных свойства:
    alert(event.promise); // [object Promise] - промис, который сгенерировал ошибку
    alert(event.reason); // Error: Ошибка! - объект ошибки, которая не была обработана
});

new Promise(() => {
    throw new Error('error!');
}); // нет обработчика ошибок
```

Это событие является частью [стандарта HTML](https://html.spec.whatwg.org/multipage/webappapis.html#unhandled-promise-rejections).

Если происходит ошибка, и отсутствует её обработчик, то генерируется событие `unhandledrejection`, и соответствующий объект `event` содержит информацию об ошибке.

Обычно такие ошибки неустранимы, поэтому лучше всего - информировать пользователя о проблеме и, возможно, отправить информацию об ошибке на сервер.

В не-браузерных средах, таких как Node.js, есть другие способы отслеживания необработанных ошибок.

## Итого

- `.catch` перехватывает все виды ошибок в промисах: будь то вызов `reject()` или ошибка, брошенная в обработчике при помощи `throw`.
- Необходимо размещать `.catch` там, где мы хотим обработать ошибки и знаем, как это сделать. Обработчик может проанализировать ошибку (могут быть полезны пользовательские классы ошибок) и пробросить её, если ничего не знает о ней (возможно, это программная ошибка).
- Можно и совсем не использовать `.catch`, если нет нормального способа восстановиться после ошибки.
- В любом случае нам следует использовать обработчик события `unhandledrejection` (для браузеров и аналог для других окружений), чтобы отслеживать необработанные ошибки и информировать о них пользователя (и, возможно, наш сервер), благодаря чему наше приложение никогда не будет "просто умирать".
