//загальна Promise-ified версія XMLHttpRequest:

function get(url){
    return new Promise(function(resolve, reject){
        var req = new XMLHttpRequest();
        req.open('GET', url);
        req.onload = function(){
            if (req.status === 200){
                //Promise resolved
                resolve(req.response);
            }
            else{
                //Promise reject
                reject(Error(req.statusText))
            }
        };
        req.onerror = function(){
            reject(Error('Network Error'))
        };
        req.send();
    });
}

get(url)
.then(function(response){
//success function
},function(err){
//error function
})
//разделить на 2 then()
//для ф-ции щшибки прим. метод catch()
get(url)
.then(function(response){
}, undefined)
.catch(function(err){
})

/**Реальне значення в промісах, коли ми маємо декілька 
 * асинхронних функцій які нам потрібно виконати в певному 
 * порядку. Ми можемо зв’язати .then() і .catch() разом, 
 * щоб створити послідовність асинхронних функцій. 
 * Ми робимо це, повертаючи іншу promise в межах успішної 
 * чи помилкової функції. */

 /**Якщо promise з ланцюжка вирішена, вона буде рухатися 
  * далі до наступної успішної функції (.then() ) в 
  * послідовності. Якщо, з іншого боку, promise відхилена, 
  * вона перейде до наступної помилкової функція (.catch()) 
  * в послідовності. */
get(url)
.then(function(response){
    response = JSON.parse(response);
    let secondURL = response.data.url;
    //return another Promise
    return get(secondURL);
})
.then(function(response){
    response = JSON.parse(response);
    let thirdURL = response.data.url;
    //return another Promise
    return get(thirdURL)
})
.catch(function(err){
    handleError(err);
})

/**Асинхронне виконання promises
Можуть бути випадки, коли ми хочемо виконати групу 
promise-ified функцій асинхронно, і потів виконати дію 
тільки тоді, коли всі promises будуть завершені. 
Наприклад, якщо ми хочемо перенести декілька зображень і 
відображати їх на сторінці. Для цього нам потрібно 
використати два методи. 
Перший - метод Array.map() дозволяє нам виконати дію для 
кожного елемента масиву, і створює новий масив результатів 
цих дій.
Другий - метод Promise.all() повертає promise, який виконано 
тільки тоді коли всі проміси з масиву будуть вирішені. 
Якщо який-небудь один promise в межах масиву відхиляється, 
Promise.all () promise також відхиляється. */
const arrayOfURLs = ['one.json', 'two.json', 'three.json', 'four.json'];
const arrayOfPromises = arrayOfURLs.map(get);

Promise.all(arrayOfPromises)
.then(function(arrayOfResults){
    //smth
})
.catch(function(err){
    //handle error
})


//
function imgLoad(url) {
    // Create new promise with the Promise() constructor;
    // This has as its argument a function
    // with two parameters, resolve and reject
    return new Promise(function(resolve, reject) {
      // Standard XHR to load an image
      var request = new XMLHttpRequest();
      request.open('GET', url);
      request.responseType = 'blob';
      // When the request loads, check whether it was successful
      request.onload = function() {
        if (request.status === 200) {
        // If successful, resolve the promise by passing back the request response
          resolve(request.response);
        } else {
        // If it fails, reject the promise with a error message
          reject(Error('Image didn\'t load successfully; error code:' + request.statusText));
        }
      };
      request.onerror = function() {
      // Also deal with the case when the entire request fails to begin with
      // This is probably a network error, so reject the promise with an appropriate message
          reject(Error('There was a network error.'));
      };
      // Send the request
      request.send();
    });
  }
  // Get a reference to the body element, and create a new image object
  var body = document.querySelector('body');
  var myImage = new Image();
  // Call the function with the URL we want to load, but then chain the
  // promise then() method on to the end of it. This contains two callbacks
  imgLoad('myLittleVader.jpg').then(function(response) {
    // The first runs when the promise resolves, with the request.response
    // specified within the resolve() method.
    var imageURL = window.URL.createObjectURL(response);
    myImage.src = imageURL;
    body.appendChild(myImage);
    // The second runs when the promise
    // is rejected, and logs the Error specified with the reject() method.
  }, function(Error) {
    console.log(Error);
  });