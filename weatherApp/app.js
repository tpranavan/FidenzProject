
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "4d8fb5b93d4af21d66a2948710284366";

form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;

  //check if there's already a city
  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
 
      if (inputVal.includes(",")) {
     
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
     
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = ` already you got the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } `;
      form.reset();
      input.focus();
      return;
    }
  }

  // Check if the data is stored in localStorage and is not expired
  let dataArray = localStorage.getItem(inputVal);
  if (dataArray) {
    dataArray = JSON.parse(dataArray);
    let expired = new Date().getTime() - dataArray.timestamp > 5 * 60 * 1000;
    if (!expired) {
      console.log(dataArray.data);
      return;
    }
  }

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Open the request and specify the URL to retrieve the data from
  xhr.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric", true);

  // Send the request
  xhr.send();

  // Handle the response when it is received
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Store JSON data in localStorage
      let data = JSON.parse(xhr.responseText);
      localStorage.setItem(inputVal, JSON.stringify({
        data: data,
        timestamp: new Date().getTime()
      }));

      // Access the data
      console.log(data);
    }
  };
    
   
    
  //ajax to URL
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys ,visibility ,weather,wind, } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
        weather[0]["icon"]
      }.svg`;

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
      <table style="width:100%">
      <tr>
         <th ><h2 class="city-name" data-name="${name},${sys.country}">
              <span>${name}</span>
              <sup>${sys.country}</sup>
            </h2>
            
            
            <figure>
              <img class="city-icon" src="${icon}" alt="${
            weather[0]["description"]
          }">
              <figcaption>${weather[0]["description"]}</figcaption>
            </figure>
            
            </th>
         
         
         <th > <div class="city-temp">${(main.temp)}<sup>°C</sup></div>
            <div class="tempminmax">Temp Min : ${(main.pressure)}hPa</div>
            <div class="tempminmax">Temp Max : ${(main.pressure)}hPa</div>
           
            <br>
    </th>
      </tr>
      
      
    
    </table>
        <br>
        <figure>
        <table style="width:100%">
        <tr>
          <th > <div >Pressure : ${(main.pressure)}hPa</div></th>
          <th rowspan="3"> <div > ${(wind.speed)}m/s</div>
                              <div >${(wind.deg)} Degree</div>
           </th>
            <th rowspan="3" > <div >Sunrise: ${(sys.sunrise)}</div>
             <div >Sunset: ${(sys.sunset)}</div>
            
            </th>
    
        </tr>
        <tr>
          <td> <div >Humidity : ${(main.humidity)}%</div></td>

         
        </tr>
        <tr>
          <td> <div >Visibility : ${(visibility)}Km</div></td>
        
        </tr>
      </table>
      </figure>


      `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});