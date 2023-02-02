// //array to store JSON data
// var dataArray = [];

// // Use fetch API to get JSON data
// fetch("cities.json")
//   .then(response => response.json())
//   .then(jsonData => {
//     // Store JSON data in the dataArray
//     dataArray = jsonData;

//     // Loop through the dataArray and display the data on the HTML page
//     for (var i = 0; i < dataArray.length; i++) {
//       document.getElementById("output").innerHTML += 
//         "<p>" + dataArray[i]+"</p>";
//     }
//   })
//   .catch(error => console.error(error));



function jeyson()
{
var onion = new XMLHttpRequest();
onion.open("GET", "json.json", true);
onion.send(null);

/* var anotheronion = angular.fromJson(onion.responseText, false); */

    var onionarray = new Array()

}