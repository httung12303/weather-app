const API_KEY = 'dddd5ae2d6bf803bbe59dca32973d978';

async function getCurrentWeather(city) {
  const info = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
    {mode:"cors"}
  ).then(response => response.json());
  const extractedInfo = extractInfo(info);
  console.log(extractedInfo);
}

async function getWeather(city) {
  const info = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&cnt=8`,
    {
      mode: 'cors',
    }
  ).then((response) => response.json());
  const extractedInfo = info.list.map(item => extractInfo(item));
  console.log(extractedInfo);
}

function extractInfo(item) {
  const { dt, main, weather, wind } = item;
    return { dt, main, weather, wind };
}

export { getWeather, getCurrentWeather };
