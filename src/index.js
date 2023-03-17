import { getWeather, getCurrentWeather } from './weather';
import {
  displayCurrentWeather,
  displayDailyWeather,
  displayHourlyWeather,
} from './display';
import 'normalize.css';
import './style.css';

window.onload = () => updateWeather('Hanoi');

const searchBar = document.querySelector('.search-bar');
const searchButton = document.querySelector('.search-btn');
const dailyBtn = document.querySelector('.daily-btn');
const hourlyBtn = document.querySelector('.hourly-btn');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const chooseBtns = document.querySelectorAll('.choose');

searchButton.onclick = () => updateWeather(searchBar.value);
dailyBtn.onclick = () => showDailyWeather();
hourlyBtn.onclick = () => showHourlyWeather();
prevBtn.onclick = () => prevHourlyWeather();
nextBtn.onclick = () => nextHourlyWeather();
Array.from(chooseBtns).forEach((btn, index) => {
  btn.onclick = () => navigateHourlyWeather(index);
});

function nextHourlyWeather() {
  const hourlyWeather = document.querySelectorAll('.group');
  const index = Array.from(hourlyWeather).findIndex((ele) =>
    ele.classList.contains('active')
  );
  if (index === -1) return;
  hourlyWeather[index].classList.remove('active');
  hourlyWeather[(index + 1) % 3].classList.add('active');
}

function prevHourlyWeather() {
  const hourlyWeather = document.querySelectorAll('.group');
  const index = Array.from(hourlyWeather).findIndex((ele) =>
    ele.classList.contains('active')
  );
  if (index === -1) return;
  hourlyWeather[index].classList.remove('active');
  hourlyWeather[(index + 2) % 3].classList.add('active');
}

function showDailyWeather() {
  const dailyWeather = document.querySelector('.daily-weather');
  const hourlyWeather = document.querySelectorAll('.group');
  const navigate = document.querySelector('.navigate');
  hourlyWeather.forEach((ele) => ele.classList.remove('active'));
  navigate.classList.remove('active');
  dailyWeather.classList.add('active');
}

function showHourlyWeather() {
  const dailyWeather = document.querySelector('.daily-weather');
  const hourlyWeather = document.querySelectorAll('.group')[0];
  const navigate = document.querySelector('.navigate');
  navigate.classList.add('active');
  dailyWeather.classList.remove('active');
  hourlyWeather.classList.add('active');
}

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

    displayCurrentWeather(currentWeather);
    displayDailyWeather(dailyWeather);
    displayHourlyWeather(hourlyWeather);
  } catch (err) {
    alert('Make sure you searched for a valid city!');
  }
}

function navigateHourlyWeather(index) {
  const groups = document.querySelectorAll('.group');
  console.log(groups);
  const i = Array.from(groups).findIndex((group) =>
    group.classList.contains('active')
  );
  console.log(i);
  if (i === -1) return;
  groups[i].classList.remove('active');
  groups[index].classList.add('active');
}
