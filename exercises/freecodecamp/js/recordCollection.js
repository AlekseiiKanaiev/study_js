// Setup
var collection = {
    "2548": {
      "album": "Slippery When Wet",
      "artist": "Bon Jovi",
      "tracks": [ 
        "Let It Rock", 
        "You Give Love a Bad Name" 
      ]
    },
    "2468": {
      "album": "1999",
      "artist": "Prince",
      "tracks": [ 
        "1999", 
        "Little Red Corvette" 
      ]
    },
    "1245": {
      "artist": "Robert Palmer",
      "tracks": [ ]
    },
    "5439": {
      "album": "ABBA Gold"
    }
};
// Keep a copy of the collection for tests
var collectionCopy = JSON.parse(JSON.stringify(collection));

// Only change code below this line
function updateRecords(id, prop, value) {
  if(collectionCopy.hasOwnProperty(id)){
    let innerObj = collectionCopy[id];
    if (value){
        if(prop !== 'tracks'){
            innerObj[prop] = value;
        }
        else if(innerObj.hasOwnProperty(prop)){
            innerObj[prop].push(value);
        }
        else{
            innerObj[prop] = [value];
        }
    }
    else{
        delete innerObj[prop];
    }
  }
  
  return collectionCopy;
}

// Alter values below to test your code
updateRecords(5439, "artist", "ABBA");
updateRecords(5439, "tracks", "Take a Chance on Me");
updateRecords(2548, "artist", "");

