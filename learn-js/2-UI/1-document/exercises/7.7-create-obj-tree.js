let data = {
    "Рыбы": {
      "форель": {},
      "лосось": {}
    },
  
    "Деревья": {
      "Огромные": {
        "секвойя": {},
        "дуб": {}
      },
      "Цветковые": {
        "яблоня": {},
        "магнолия": {}
      }
    }
};
window.onload = () => {
    function createTree(elem, data){
        let ul = document.createElement('ul');
        for (let [key, val] of Object.entries(data)) {
            let li = document.createElement('li');
            li.append(key);
            ul.append(li);
            if (val instanceof Object && Object.entries(val).length > 0){
                createTree(li, val);
            }
        }
        elem.append(ul);
    }

    function createTreeStr(elem, data){
        let str = '<ul>';
        function addPunkt(data) {
            for (let [key, val] of Object.entries(data)){
                str += `<li>${key}`;
                if (val instanceof Object && Object.entries(val).length > 0){
                    str += '<ul>';
                    addPunkt(val);
                    str += '</ul>';
                }
                str += '</li>'
            }
        }
        addPunkt(data);
        str += '</ul>';
        elem.innerHTML = str;
    }
    
    let container = document.getElementById('container');
    createTree(container, data);
    createTreeStr(container, data);
}
