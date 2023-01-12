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

// search submit - change h1 city name input and temperature of location
function showTemperature(response) {
  console.log(response);
  let cityElement = document.querySelector("h1");
  cityElement.innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}`;
  console.log(response.data.main.feels_like);
  let feelslike = Math.round(response.data.main.feels_like);
  let feelslikeElement = document.querySelector("#feelsLike");
  feelslikeElement.innerHTML = `Feels like: ${feelslike} °C`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${wind} km/h`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
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

// celsuis fahrenheit link temperature

//function calculateCelsius(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");
//temperatureElement.innerHTML = 20;
//}

//function calculateFahrenheit(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector("#temperature");

//temperatureElement.innerHTML = (temperature * 9) / 5 + 32;
//}

//let celsius = document.querySelector("#celsius-link");
//celsius.addEventListener("click", calculateCelsius);

//let fahrenheit = document.querySelector("#fahrenheit-link");
//fahrenheit.addEventListener("click", calculateFahrenheit);
