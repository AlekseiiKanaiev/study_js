var Person = function(firstAndLast) {
    // Complete the method below and implement the others similarly
    let firstName;
    let lastName;
    this.getFullName = function() {
      return `${firstName} ${lastName}`;
    };
    this.getFirstName = function() {
      return firstName;
    };
    this.getLastName = function() {
      return lastName;
    };
    this.setFullName = function(firstAndLast) {
      let arr = firstAndLast.split(' ');
      this.setFirstName(arr[0]);
      this.setLastName(arr[1]);
    };
    this.setFirstName = function(first) {
      firstName = first;
    };
    this.setLastName = function(last) {
      lastName = last;
    };
    return this.setFullName(firstAndLast)
  };
  
  var bob = new Person('Bob Ross');
  console.log(bob.getFullName());
  console.log(Object.keys(bob).length);