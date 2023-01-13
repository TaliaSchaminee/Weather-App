// date and time
let currentDay = document.querySelector("#date");
let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

currentDay.innerHTML = `${day} ${hour}:${minute} `;

// forecast dates
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
       <div class="col-2">
         <div class="weather-forecast-date">${day}</div>
          <img
            src="images/11d.png"
           alt="description of weather icon"
           width="50"
          />
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max"> 18 </span> |
            <span class="weather-forecast-temperature-min"> 12 </span>
          </div> 
         </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// search submit - change h1 city name input and temperature of location
function showTemperature(response) {
  console.log(response);
  let cityElement = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let feelslike = Math.round(response.data.main.feels_like);
  let feelslikeElement = document.querySelector("#feelsLike");
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${temperature}`;
  feelslikeElement.innerHTML = `Feels like: ${feelslike} °C`;
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  windElement.innerHTML = `Wind: ${wind} km/h`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
}

function searchEngine(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input");
  let apiKey = "b146a168d6fecbebeaa5d18c4b51fce1";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  let unit = "metric";
  axios
    .get(`${apiUrl}${city.value}&appid=${apiKey}&units=${unit}`)
    .then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchEngine);

// current location submit

function getCurrentLocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey1 = "b146a168d6fecbebeaa5d18c4b51fce1";
  let apiUrl1 = "http://api.openweathermap.org/data/2.5/weather?";
  let unit = "metric";
  axios
    .get(`${apiUrl1}lat=${lat}&lon=${lon}&appid=${apiKey1}&units=${unit}`)
    .then(showTemperature);
}

function retrieveCurrentLocation() {
  console.log(navigator.geolocation);
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", retrieveCurrentLocation);

function showFahrenheitTemperature(event) {
  event.preventDefault();

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
displayForecast();

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
