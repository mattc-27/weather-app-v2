import WeatherIcons from './WeatherIcons';

export async function getWeatherData(query) {
  const { q } = query;
  const searchUrl = `${q}`;
  try {
    const response = await fetch(`/api/weather/${searchUrl}`)
    const data = await response.json();
    console.log(data);
    const formattedWeather = formatWeather(data);
    return { success: true, ...formattedWeather };
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
}

const formatWeather = (data) => {
  const {
    location: { name, region, country },
    current: { temp_f, condition, wind_mph, wind_dir, humidity, pressure_in },
    forecast: { forecastday }
  } = data

  const formatIcon = WeatherIcons.find(({ code }) => code === condition.code)

  const isValid = true;

  return {
    name,
    region,
    country,
    temp_f,
    condition,
    wind_mph,
    wind_dir,
    humidity,
    pressure_in,
    forecastday,
    formatIcon,
    isValid
  };
};

export function getRandomItem(arr) {
  // get random index value
  const randomIndex = Math.floor(Math.random() * arr.length);
  // get random item
  const item = arr[randomIndex];
  return item;
}