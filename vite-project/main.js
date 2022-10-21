//https://api.openweathermap.org/data/2.5/weather?q=Denver&appid=5ee4758a8b57eb399b0bc2ae154c12be
const importByNameUrl = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5ee4758a8b57eb399b0bc2ae154c12be`;
const searchBtn = document.getElementById('btn');
const input = document.getElementById('input');
const city = document.getElementById('city');
const sky = document.getElementById('sky');
const temperature = document.getElementById('temperature');
const skyIcon = document.getElementById('skyIcon');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
//fetchData and searching
const fetchWeather = (c) => {
  fetch(importByNameUrl(c))
    .then((res) => res.json())
    .then((data) => showData(data));
}
//Button Operation
searchBtn.addEventListener('click', () => {
  fetchWeather(input.value);
  input.value = '';
  document.getElementById('main').classList.add("bg-[url('https://source.unsplash.com/random/?water,weather,nature')]");
});
input.addEventListener('keyup', (e) => {
  if (e.key == 'Enter') {
    fetchWeather(input.value)
    input.value = '';

  }
});
//Reordenate data
function showData(d) {
  if (d.cod == 404) {
    city.innerHTML = 'City not found';
    temperature.innerHTML = '';
    sky.innerHTML = '';
    humidity.innerHTML = '';
    windSpeed.innerHTML = '';
    skyIcon.src = '';
} else {
  city.innerHTML = d.name;
  temperature.innerHTML = `${Math.round(d.main.temp - 273.15)}°C`;
  sky.innerHTML = d.weather[0].main;
  humidity.innerHTML = 'Humidity: ' + d.main.humidity + '%';
  windSpeed.innerHTML = 'Wind: ' + d.wind.speed + 'km/h';
  skyIcon.src = `http://openweathermap.org/img/wn/${d.weather[0].icon
    }@2x.png`
}
    
}
