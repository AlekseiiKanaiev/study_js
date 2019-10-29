//create date
let date = new Date(2012, 1, 20, 3, 12);
console.log(date);
let date1 = new Date(`2012-01-20T03:12`);
console.log(date1);

//show weekday

function getWeekDay(date){
    const weekdays = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]
    return weekdays[date.getDay()]
}
let weekday = getWeekDay(date)
console.log(weekday);
