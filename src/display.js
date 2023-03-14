import { format } from 'date-fns';
import * as utils from './utils';

async function displayCurrentWeather(weather) {
  const currentWeatherEle = document.querySelector('.current-weather');
  const location = currentWeatherEle.querySelector('.location');
  const time = currentWeatherEle.querySelector('.time');
  const date = currentWeatherEle.querySelector('.date');
  const temp = currentWeatherEle.querySelector('.temp');
  const description = currentWeatherEle.querySelector('.description');
  location.textContent = weather.city;
  time.textContent = format(weather.time, 'HH:MM');
  date.textContent = format(weather.time, 'EEEE, do LLLL yyyy');
  temp.textContent = weather.main.temp;
  description.textContent = weather.weather[0].description;
}

async function displayDailyWeather(dailyWeather) {
  const dailyWeatherEle = document.querySelector('.daily-weather');
  utils.removeAllChildNodes(dailyWeatherEle);
  dailyWeather.forEach((weather) =>
    dailyWeatherEle.appendChild(createWeatherEle(weather, true))
  );
}

async function displayPeriodicWeather(periodicWeather) {
  const periodicWeatherEle = document.querySelector('.periodic-weather');
  utils.removeAllChildNodes(periodicWeatherEle);
  periodicWeather.forEach((weather) =>
    periodicWeatherEle.appendChild(createWeatherEle(weather, false))
  );
}

function createWeatherEle(weather, showDate) {
  const ele = document.createElement('div');
  const time = document.createElement('div');
  const temp = document.createElement('div');
  const humid = document.createElement('div');

  ele.appendChild(time);
  ele.appendChild(temp);
  ele.appendChild(humid);

  ele.className = 'weather';
  time.className = 'time';
  temp.className = 'temp';
  humid.className = 'humid';

  time.textContent = showDate
    ? format(weather.time, 'EEEE')
    : format(weather.time, 'HH:MM');
  temp.textContent = weather.main.temp;
  humid.textContent = weather.main.humidity;

  return ele;
}

export { displayCurrentWeather, displayDailyWeather, displayPeriodicWeather };
