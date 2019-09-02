let browser = prompt('Your browser', '');

if (browser === 'Edge'){
    alert("You've got the Edge!");
}
else if(browser === 'Chrome' || 
        browser === 'Firefox' || 
        browser === 'Safari' || 
        browser === 'Opera'){
    alert('Ok');
}
else{
    alert('Not ok');
}