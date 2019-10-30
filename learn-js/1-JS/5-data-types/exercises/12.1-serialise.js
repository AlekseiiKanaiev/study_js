let user = {
    name: "Василий Иванович",
    age: 35
};

let strUser = JSON.stringify(user)
console.log(strUser);
let objUser = JSON.parse(strUser)
console.log(objUser);

let room = {
    number: 23
};
  
  let meetup = {
    title: "Совещание",
    occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
    place: room
};

// цикличные ссылки
room.occupiedBy = meetup;
meetup.self = meetup;

let res = JSON.stringify(meetup, (key, val) => {
    console.log(`##${key}: ${(val)}##`);
    // return (key !== '' && val == meetup)? undefined : val;
    return (key == 'self' || (key == 'occupiedBy' && val == meetup))? undefined : val;
})
console.log(res);