//3d688616b82249ce87d174545240112

var searchInput = document.getElementById("searchInput");
var errorMassage = document.querySelector(".errorMassage");
var searchButton = document.querySelector("#searchBtn");
var countryName = ``;
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
async function getWeather(country) {
  try {
    errorMassage.classList.add("d-none");
    var response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=3d688616b82249ce87d174545240112&q=${country}&days=3`
    );
    var data = await response.json();
    console.log(data);

    var countryData = extractDataFromApi(data);
    display(countryData);
  } catch (error) {
    alert("Not Found");

    console.log(error);
    getCurrentLocation();
  } finally {
    errorMassage.classList.add("d-none");
  }
}
function display(countryData) {
  console.log(countryData.windKph);

  var cartona = `  <div class="col-lg-4">
              <div class="inner bg-col rounded-start-2 pb-1 ">
                <div class="current-date p-2 d-flex justify-content-between align-items-center">
                  <span>${countryData.currentDayName}</span>
                  <span>${countryData.currentDay}${countryData.currentMonth}</span>
                </div>
                <div class="content p-4">
                  <h3 class="h6">${countryData.countryName}</h3>
                  <h4 class="text-white fw-bold pb-3 pb-xl-1 ">${countryData.currentTemperature}<Sup>o</Sup>c </h4>
                  <img src=${countryData.currentIcon} alt=${countryData.currentStatus} class="w-25">
                  <p class="text-primary">${countryData.currentStatus}</p>
                  <div >
                    <span> <img src="images/icon-umberella.png" alt=""> ${countryData.rain}%</span>
                    <span class="mx-3"> <img src="images/icon-wind.png" alt=""> ${countryData.windKph} KM/H</span>
                    <span> <img src="images/icon-compass.png" alt=""> East</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 pb-lg-4">
              <div class="inner bg-col text-center pb-lg-4">
                <div class="current-date p-2 ">
                  <span>${countryData.tommorowDate}</span>
                
                </div>
                <div class="content p-lg-4 pb-5 mb-lg-4">
                   <img src=${countryData.tommorowIcon} alt=${countryData.tommorowStatus}>
                  <h4 class="text-white fw-bold py-4 fs-4 mb-0 pb-0">${countryData.tommorowTemperature}<Sup>o</Sup>c</h4>
                  <p >${countryData.tommorowMinimumTemperature}</p>
                  <p class="text-primary pb-5" >${countryData.tommorowStatus}</p>
                
                </div>
              </div>
            </div>
            <div class="col-lg-4 pb-lg-0 rounded-end-2">
              <div class="inner bg-col text-center pb-lg-4">
                <div class="current-date p-2 ">
                  <span>${countryData.afterTommorowDate}</span>
                
                </div>
                <div class="content p-lg-4 pb-5 mb-4">
                   <img src=${countryData.afterTommorowIcon} alt=${countryData.afterTommorowStatus}>
                  <h4 class="text-white fw-bold py-4 fs-4 mb-0 pb-0">${countryData.afterTommorowTemperature}<Sup>o</Sup>c </h4>
                  <p >${countryData.afterTommorowMinimumTemperature}</p>
                  <p class="text-primary pb-5" >${countryData.afterTommorowStatus}</p>
                
                </div>
              </div>
            </div>`;
  document.getElementById("rowData").innerHTML = cartona;
}
function extractDataFromApi(data) {
  var date = new Date(data.current.last_updated);
  var tommorowDate = new Date(data.forecast.forecastday[1].date);
  var afterTommorowDate = new Date(data.forecast.forecastday[2].date);

  var countryData = {
    countryName: data.location.name,
    currentMonth: months[date.getMonth()],
    currentDay: date.getDate(),
    currentDayName: daysOfWeek[date.getDay()],
    currentTemperature: data.current.temp_c,
    currentStatus: data.current.condition.text,
    currentIcon: data.current.condition.icon,
    windKph: data.current.wind_kph,
    rain: data.forecast.forecastday[0].day.daily_chance_of_rain,
    tommorowDate: daysOfWeek[tommorowDate.getDay()],
    tommorowTemperature: data.forecast.forecastday[1].day.maxtemp_c,
    tommorowMinimumTemperature: data.forecast.forecastday[1].day.mintemp_c,
    tommorowStatus: data.forecast.forecastday[1].day.condition.text,
    tommorowIcon: data.forecast.forecastday[1].day.condition.icon,
    afterTommorowDate: daysOfWeek[afterTommorowDate.getDay()],
    afterTommorowTemperature: data.forecast.forecastday[2].day.maxtemp_c,
    afterTommorowMinimumTemperature: data.forecast.forecastday[2].day.mintemp_c,
    afterTommorowStatus: data.forecast.forecastday[2].day.condition.text,
    afterTommorowIcon: data.forecast.forecastday[2].day.condition.icon,
  };
  console.log(countryData.windKph);

  return countryData;
}
// searchInput.addEventListener('input', () => {
//     getWeather(searchInput.value)
// })
searchButton.addEventListener("click", function () {
  getWeather(searchInput.value);
});

function getCurrentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getMyCurrentCountry);
  }
}
async function getMyCurrentCountry(position) {
  var longitude = position.coords.longitude;
  var latitude = position.coords.latitude;
  try {
    var response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    var data = await response.json();
    getWeather(data.address.state);
  } catch (error) {}
}
getCurrentLocation();
