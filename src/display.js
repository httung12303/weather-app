import { format } from 'date-fns';
import * as utils from './utils';

async function displayCurrentWeather(weather) {
  console.log(weather);
  displayCurrentWeatherOverview(weather);
  displayCurrentWeatherExtra(weather);
}

async function displayDailyWeather(dailyWeather) {
  const dailyWeatherEle = document.querySelector('.daily-weather');
  const groups = document.querySelectorAll('.group');
  const navigate = document.querySelector('.navigate');
  Array.from(groups).forEach((group) => group.classList.remove('active'));
  navigate.classList.remove('active');
  dailyWeatherEle.classList.add('active');
  utils.removeAllChildNodes(dailyWeatherEle);
  dailyWeather.forEach((weather) =>
    dailyWeatherEle.appendChild(createWeatherEle(weather, true))
  );
}

async function displayHourlyWeather(hourlyWeather) {
  const groups = document.querySelectorAll('.group');
  groups.forEach((group) => utils.removeAllChildNodes(group));
  hourlyWeather.forEach((weather, index) => {
    const group = groups[Math.floor(index / 8) % 3];
    group.appendChild(createWeatherEle(weather, false));
  });
}

function displayCurrentWeatherOverview(weather) {
  const currentWeatherEle = document.querySelector('.current-weather');
  const location = currentWeatherEle.querySelector('.location');
  const time = currentWeatherEle.querySelector('.time');
  const date = currentWeatherEle.querySelector('.date');
  const temp = currentWeatherEle.querySelector('.temp');
  const description = currentWeatherEle.querySelector('.description');
  const icon = currentWeatherEle.querySelector('.icon');
  location.textContent = weather.location;
  time.textContent = format(weather.time, 'HH:MM');
  date.textContent = format(weather.time, 'EEEE, do LLLL yyyy');
  temp.textContent = weather.temp;
  description.textContent = weather.condition;
  icon.src = utils.getImgSrc(weather.icon);
}

function displayCurrentWeatherExtra(weather) {
  const currentWeatherEle = document.querySelector('.current-weather');
  const feelslike = currentWeatherEle.querySelector('.feels-like');
  const humidity = currentWeatherEle.querySelector('.humidity');
  const wind = currentWeatherEle.querySelector('.wind-speed');
  const vision = currentWeatherEle.querySelector('.vision');
  const airQuality = currentWeatherEle.querySelector('.air-quality');
  feelslike.textContent = weather.feelslike;
  humidity.textContent = weather.humidity;
  wind.textContent = weather.wind;
  vision.textContent = weather.vision;
  airQuality.textContent = weather.airQuality;
}

function createWeatherEle(weather, isDaily) {
  const ele = document.createElement('div');
  const time = document.createElement('div');
  const temp = document.createElement('span');
  const tempUnit = document.createElement('span');
  const info = document.createElement('info');
  const icon = document.createElement('img');

  ele.appendChild(time);
  ele.appendChild(info);
  ele.appendChild(icon);

  ele.className = 'weather';
  time.className = 'time';
  info.className = 'info';
  temp.className = 'temp';
  tempUnit.className = 'temp-unit';
  info.appendChild(temp);
  info.appendChild(tempUnit);

  const hourlyTime =
    new Date().getHours() === weather.time.getHours()
      ? 'Now'
      : `${format(weather.time, 'HH')}:00`;

  time.textContent = isDaily ? format(weather.time, 'EEEE') : hourlyTime;
  temp.textContent = weather.temp;
  tempUnit.textContent = '℃';
  icon.src = weather.icon;
  return ele;
}

export { displayCurrentWeather, displayDailyWeather, displayHourlyWeather };
