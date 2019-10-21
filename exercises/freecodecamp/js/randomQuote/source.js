/**It’s checking to see if the active window is in an iFrame. 
 * It uses that information at the end when you try to share the quote. 
 * If It’s not in an iFrame then it pops open a new window to handle the Twitter/Tumblr sharing 
 * without completely redirecting the page. */
function inIframe () { try { return window.self !== window.top; } catch (e) { return true; } }

const URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

const COLORS = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

function getQuotes(URL){
    return new Promise ((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', URL);
        request.onload = () => (request.status === 200)? resolve(request.response) : reject(Error(request.statusText));
        request.onerror = () => reject(Error('Network error'));
        request.send();
        console.log('submit');
    })
}

function getJsonQuotes(URL){
    return getQuotes(URL).then(JSON.parse)
}

function setQuote(){
    getJsonQuotes(URL)
        .then( result => {
            // console.log(result);
            let currentQuote = getRandomQuote(result);
            if (currentQuote){
                let twit = encodeURIComponent(`"${currentQuote.quote} ${currentQuote.author}"`);
                let twitHref = document.getElementById('tweet-quote').getAttribute('href');
                document.getElementById('tweet-quote').setAttribute('href', twitHref+`?hashtags=quotes&related=freecodecamp&text='${twit}`);
                document.getElementById('quote').innerHTML = `${currentQuote.quote}`;
                document.getElementById('author').innerHTML = `- ${currentQuote.author}`;
                setTimeout(()=>document.getElementById('quote-message').style.opacity = 1, 500)
            }
            else{
                document.getElementById('quote').innerHTML = "Can't load quote";
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

function getRandomColor(COLORS){
    return COLORS[Math.floor(Math.random()*COLORS.length)]
}
function colorize(){
    let color = getRandomColor(COLORS);
    let bodyStyle = document.body.style;
    if (bodyStyle.color !== color){
        bodyStyle.backgroundColor = color;
        bodyStyle.color = color;
        document.getElementById('new-quote').style.backgroundColor = color;
        [...document.getElementsByClassName('button')].forEach(el => el.style.color = color)
    }
    else{
        colorize();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    colorize();
});

window.onload = () => {
    setQuote();
    document.getElementById('new-quote').addEventListener('click', () => {
        document.getElementById('quote-message').style.opacity = 0;
        setTimeout(() => {
            setQuote();
            colorize();
        }, 1200);
    });
}

    