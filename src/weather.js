import * as utils from './utils';

const AIR_QUALITY = [
  'Good',
  'Moderate',
  'Unhealthy',
  'Unhealthy',
  'Very unhealthy',
  'Hazardous',
];

const API_KEY = 'b677ed243ead438b873131551231503';

async function getCurrentWeather(city) {
  const info = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`,
    { mode: 'cors' }
  ).then((response) => response.json());
  console.log(info);
  return {
    location: info.location.name,
    time: new Date(info.location.localtime_epoch * 1000),
    feelslike: info.current.feelslike_c,
    humidity: info.current.humidity,
    temp: info.current.temp_c,
    vision: info.current.vis_km,
    wind: info.current.wind_kph,
    condition: info.current.condition.text,
    icon: info.current.condition.icon,
    airQuality: AIR_QUALITY[info.current.air_quality['us-epa-index'] - 1],
  };
}

async function getWeather(city) {
  const info = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`,
    {
      mode: 'cors',
    }
  ).then((response) => response.json());

  const dailyWeather = info.forecast.forecastday.map((weather) =>
    extractWeatherForecast(weather)
  );
  const hourlyWeather = extract24HoursWeather(info.forecast.forecastday[0]);
  return { dailyWeather, hourlyWeather };
}

function extractWeatherForecast(item) {
  return {
    time: new Date(item.date_epoch * 1000),
    temp: item.day.avgtemp_c,
    humidity: item.day.avghumidity,
    condition: item.day.condition.text,
    icon: utils.getImgSrc(item.day.condition.icon),
  };
}

function extract24HoursWeather(item) {
  return item.hour.map((hour) => ({
    time: new Date(hour.time_epoch * 1000),
    temp: hour.temp_c,
    humidity: hour.humidity,
    condition: hour.condition.text,
    icon: utils.getImgSrc(hour.condition.icon),
  }));
}

export { getWeather, getCurrentWeather };
