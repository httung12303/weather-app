import { format } from 'date-fns';
import * as utils from './utils';

async function displayCurrentWeather(weather) {
  console.log(weather);
  const currentWeatherEle = document.querySelector('.current-weather');
  const location = currentWeatherEle.querySelector('.location');
  const time = currentWeatherEle.querySelector('.time');
  const date = currentWeatherEle.querySelector('.date');
  const temp = currentWeatherEle.querySelector('.temp');
  const description = currentWeatherEle.querySelector('.description');
  location.textContent = weather.location;
  time.textContent = format(weather.time, 'HH:MM');
  date.textContent = format(weather.time, 'EEEE, do LLLL yyyy');
  temp.textContent = weather.temp;
  description.textContent = weather.condition;
}

async function displayDailyWeather(dailyWeather) {
  const dailyWeatherEle = document.querySelector('.daily-weather');
  utils.removeAllChildNodes(dailyWeatherEle);
  dailyWeather.forEach((weather) =>
    dailyWeatherEle.appendChild(createWeatherEle(weather, true))
  );
}

async function displayHourlyWeather(hourlyWeather) {
  const hourlyWeatherEle = document.querySelector('.hourly-weather');
  utils.removeAllChildNodes(hourlyWeatherEle);
  hourlyWeather.forEach((weather) =>
    hourlyWeatherEle.appendChild(createWeatherEle(weather, false))
  );
}

function createWeatherEle(weather, isDaily) {
  const ele = document.createElement('div');
  const time = document.createElement('div');
  const temp = document.createElement('div');
  const humid = document.createElement('div');
  const icon = document.createElement('img');

  ele.appendChild(time);
  ele.appendChild(temp);
  ele.appendChild(humid);
  ele.appendChild(icon);

  ele.className = 'weather';
  time.className = 'time';
  temp.className = 'temp';
  humid.className = 'humid';

  time.textContent = isDaily ? format(weather.time, 'EEEE') : format(weather.time, 'HH:MM');
  temp.textContent = weather.temp;
  humid.textContent = weather.humidity;
  icon.src = weather.icon;

  return ele;
}

export { displayCurrentWeather, displayDailyWeather, displayHourlyWeather };
