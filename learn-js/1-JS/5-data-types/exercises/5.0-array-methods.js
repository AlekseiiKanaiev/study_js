// ["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
//     console.log(`${item} имеет позицию ${index} в ${array}`);
// });

let user = {
    age: 18,
    younger(otherUser) {
      return otherUser.age < this.age;
    }
  };
  
  let users = [
    {age: 12},
    {age: 16},
    {age: 32}
  ];
  
  // найти число пользователей моложе, чем заданный
  let youngerUsers = users.filter(item => user.younger(item));
//  or we can:
// let youngerUsers = users.filter(user.younger, user);
  
  console.log(youngerUsers); // 2