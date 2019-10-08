/**It’s checking to see if the active window is in an iFrame. 
 * It uses that information at the end when you try to share the quote. 
 * If It’s not in an iFrame then it pops open a new window to handle the Twitter/Tumblr sharing 
 * without completely redirecting the page. */
function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }

const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

const colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

function getServerQuotes(url){
    return new Promise ((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = () => (request.status === 200)? resolve(request.response) : reject(Error(request.statusText));
        request.onerror = () => reject(Error('Network error'));
        request.send();
        console.log('submit');
    })
}

function getJsonQuotes(url){
    return getServerQuotes(url).then(JSON.parse)
}

function getQuotes(){
    getJsonQuotes(url)
        .then( result => {
            // console.log(result);
            let quote = getRandomQuote(result);
            let elemText = document.getElementById('text');
            let elemAuthor = document.getElementById('author');
            if (quote){
                elemText.innerHTML += `${quote.quote}`;
                elemAuthor.innerHTML = `- ${quote.author}`;
            }
            else{
                elemText.innerHTML = "Can't load quote";
            }
        })
        .catch((err) => {
            console.log(err);
            let alertInfo = `<div class = "alert alert-danger" id = "alert-info" role = "alert">${err}!</div>`;
            document.getElementById('madeby').insertAdjacentHTML("beforeend", alertInfo);
        })
}

function getRandomQuote(quotes){
    return quotes? quotes.quotes[Math.floor(Math.random()*quotes.quotes.length)] : {};
}

function getRandomColor(colors){
    return colors[Math.floor(Math.random()*colors.length)]
}
function colorize(){
    let color = getRandomColor(colors);
    let elemStyle = document.body.style;
    if (elemStyle.backgroundColor !== color){
        let int = setInterval(()=>{
            if (elemStyle.backgroundColor !== color){
                elemStyle.backgroundColor = color;
                elemStyle.color = color;
            }
            else{
                clearInterval(int);
            }
        }, 5000)
        // elemStyle.backgroundColor = color;
        // elemStyle.color = color;
        // document.getElementById('quote-box').style.color = color;
        // transition(document.body);

    }
    else{
        colorize();
    }
}
function transition(elem){
    elem.style.transition = 'all 5s ease'
}
document.addEventListener('DOMContentLoaded', () => {
    colorize();
})
window.onload = () => {
    getQuotes();
}