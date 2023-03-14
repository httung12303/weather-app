import * as utils from './utils'

const API_KEY = 'dddd5ae2d6bf803bbe59dca32973d978';

async function getCurrentWeather(city) {
  const info = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`,
    { mode: 'cors' }
  ).then((response) => response.json());
  const extractedInfo = extractInfo(info);
  return {city: utils.capitalizeFirstLetter(city), ...extractedInfo};
}

async function getWeather(city) {
  const info = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`,
    {
      mode: 'cors',
    }
  ).then((response) => response.json());
  const extractedInfo = info.list.map((item) => extractInfo(item));
  const dailyWeather = extractedInfo.filter((item) => item.time.getHours() >= 0 && item.time.getHours() <= 2);
  return {dailyWeather, periodicWeather: extractedInfo};
}

function extractInfo(item) {
  const { dt, main, weather, wind } = item;
  const time = new Date(dt * 1000);
  return { time, main, weather, wind };
}

export { getWeather, getCurrentWeather };
