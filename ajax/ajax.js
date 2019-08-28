// function handleResponse(response) {
//     // console.log(response);
//     for (var i = 0; i < response.items.length; i++) {
//         var item = response.items[i];
//         // in production code, item.text should have the HTML entities escaped.
//         // console.log(item);
        
//         let img = new Image;
//         img.src = item.volumeInfo.imageLinks.smallThumbnail;
//         document.getElementById("content").innerHTML += "<br>" + item.volumeInfo.title;
//         document.getElementById("content").appendChild(img)
//     }
// }

// AIzaSyC5mcWMqSMxtaecdQx-wsq6cgoZSKqZd0I

document.addEventListener("DOMContentLoaded", function(){
    var url = "https://www.googleapis.com/books/v1/volumes"
    // var apiKey = "AIzaSyC5mcWMqSMxtaecdQx-wsq6cgoZSKqZd0I"
    document.getElementById('my-form').addEventListener("submit", function(event){
        event.preventDefault();
        var param = "Harry+Potter";
        var request = new XMLHttpRequest();
        var fields = "items(saleInfo(retailPrice),volumeInfo(description,title,authors,imageLinks/smallThumbnail))"
        var alertInfo = "Incorrect"
        request.open("GET", `${url}?q=${param}&fields=${fields}&maxResults=10`)
        request.onload = function(){
            if (request.status === 200){
                console.log(JSON.parse(request.response));
            }
            else{
                console.log("Err: "+request.statusText);
                alert(alertInfo)
            }
        }
        request.send();
        console.log("submit");
    })
})
