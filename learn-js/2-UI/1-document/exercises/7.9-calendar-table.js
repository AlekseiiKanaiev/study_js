window.onload = () => {
    function createCalendar(elem, year, month) {
        let days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
        let date = new Date(Date.UTC(year, month-1, 1));
        let table = document.createElement('table');

        function createHeader(){
            let tr = document.createElement('tr');
            for (let day of days){
                let th = document.createElement('th');
                th.append(day);
                tr.append(th);
            }
            return tr;
        }

        function* createBody(){
            let day = date.getDay()%7-1;
            for (let i = 1 - day; i <= 31;){
                let tr = document.createElement('tr');
                for(let j = 0; j < 7; j++, i++){
                    let td = document.createElement('td');
                    if (i > 0 && new Date(Date.UTC(year, month-1, i)).getMonth() === date.getMonth()) {
                        td.textContent = i;
                    } else {
                        td.textContent = new Date(Date.UTC(year, month-1, i)).getDate();
                        td.style.color = 'grey';
                    }
                    tr.append(td);
                }
                yield tr;
            }
        }

        table.append(createHeader(), ...createBody());
        elem.append(table);

    }

    let calendar = document.getElementById('calendar');
    let year = +prompt('Enter year', '2020');
    let month = +prompt('Enter month', '1');
    createCalendar(calendar, year, month);
}
