import { getWeather, getCurrentWeather } from './weather';
import {
  displayCurrentWeather,
  displayDailyWeather,
  displayHourlyWeather,
} from './display';

window.onload = () => updateWeather('Hanoi');

const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');

searchButton.onclick = () => updateWeather(searchBar.value);

async function updateWeather(city) {
  try {
    const [currentWeather, dailyWeather, hourlyWeather] = await Promise.all([
      getCurrentWeather(city),
      getWeather(city),
    ]).then(([currentWeather, weather]) => [
      currentWeather,
      weather.dailyWeather,
      weather.hourlyWeather,
    ]);

    // console.log(dailyWeather);
    // console.log(hourlyWeather);

    displayCurrentWeather(currentWeather);
    displayDailyWeather(dailyWeather);
    displayHourlyWeather(hourlyWeather);
  } catch (err) {
    console.log(err);
  }
}
