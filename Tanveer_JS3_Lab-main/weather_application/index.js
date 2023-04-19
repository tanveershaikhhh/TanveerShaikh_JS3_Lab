const api = {
  key: "7e3f21edee540e6110af347b55eb1ab2",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(query) {
  console.log(query);

  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((res) => res.json())
    .then((response) => {
      displayResults(response);
    });
}

function displayResults(weather) {
  console.log(weather);

  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = getDateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>&#8451;</span>`;

  let weather_desc = document.querySelector(".current .weather");
  weather_desc.innerText = `${weather.weather[0].main}`;

  let hilow = document.querySelector(".hi-low");
  hilow.innerHTML = `${Math.round(
    weather.main.temp_min
  )}<span> &#8451; </span> / ${Math.round(
    weather.main.temp_max
  )}<span> &#8451; </span>`;
}

function getDateBuilder(d) {
  console.log(d);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
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

  let date = d.getDate();
  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
