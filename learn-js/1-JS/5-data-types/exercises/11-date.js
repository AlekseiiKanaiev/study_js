//create date
let date = new Date(2012, 1, 20, 3, 12);
console.log(date);
let date1 = new Date(`2012-01-20T03:12`);
console.log(date1);

//show weekday

function getWeekday(date){
    const weekdays = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];
    return weekdays[date.getDay()];
}
let weekday = getWeekday(date)
console.log(weekday);

//show europe weekday

function getEuropeWeekday(date){
    const europeWeekdays = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
    return europeWeekdays[(date.getDay()+6)%7];
}

let date2 = new Date(2019, 9, 30);
let weekday2 = getEuropeWeekday(date2);
console.log(weekday2);

//find day ago
function getDateAgo(date, days = 0){
    let res = new Date();
    res.setDate(date.getDate() - days);
    return res.getDate();
}

console.log(getDateAgo(new Date(), -365));

//find last day of the month
function getLastDayOfTheMonth(year, month){
    // let date = new Date(year, month);
    // date.setDate(date.getDate() - 1);
    let date = new Date(year, month, 0);
    return date.getDate();
}

console.log(getLastDayOfTheMonth(2019, 10));

//find todays seconds
function getTodaysSeconds(){
    let today = new Date();
    return Math.round((Date.now() - today.setHours(0, 0, 0, 0))/1000);
}

console.log(getTodaysSeconds());

//find seconds to tomorrow
function getSecondsToTomorrow(){
    let today = new Date();
    let tomorrow = new Date(+today + 24*3600*1000);
    return Math.round((tomorrow.setHours(0, 0, 0, 0) - today)/1000);
}

console.log(getSecondsToTomorrow());

//formmat date
function formatDate(date){
    let now = new Date();
    let res = now - date;
    if (res < 1000){
        console.log('Right now');
    } else if(res < 1000*60) {
        console.log(`${res/1000} sec. ago`);
    } else if(res < 1000 * 3600){
        console.log(`${res/(1000*60)} min. ago`);
    } else {
        // console.log(`${date.getDate()}.${date.getMonth()+1}.${date.getFullYear().toString().slice(2)}, ${date.toTimeString().slice(0, 5)}`);
        console.log(date.toLocaleDateString('ru-RU', {
            year: '2-digit', 
            day: 'numeric', 
            month: '2-digit', 
            hour: 'numeric', 
            minute: 'numeric'}
            ).replace(/-/g, '.').replace(' ', ', '));
    }
}

formatDate(new Date(new Date - 1));
formatDate(new Date(new Date - 30 * 1000));
formatDate(new Date(new Date - 5 * 60 * 1000));
formatDate(new Date(new Date - 86400 * 1000));