import { getWeather, getCurrentWeather } from './weather';
import {
  displayCurrentWeather,
  displayDailyWeather,
  displayPeriodicWeather,
} from './display';

window.onload = () => updateWeather('Hanoi');

const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-button');

searchButton.onclick = () => updateWeather(searchBar.value);

async function updateWeather(city) {
  try {
    const [weather, currentWeather] = await Promise.all([getWeather(city), getCurrentWeather(city)]);
    const {dailyWeather, periodicWeather} = weather;
    displayDailyWeather(dailyWeather);
    displayPeriodicWeather(periodicWeather);
    displayCurrentWeather(currentWeather);
  } catch(err) {
    console.log(err);
  }
  // getWeather(city).then(({ dailyWeather, periodicWeather }) => {
  //   displayDailyWeather(dailyWeather);
  //   displayPeriodicWeather(periodicWeather);
  // });
  // getCurrentWeather(city).then((info) => displayCurrentWeather(info));
}
