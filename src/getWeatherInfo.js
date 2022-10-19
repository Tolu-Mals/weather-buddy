const getWeatherInfo = (Location, weatherArray) => {
  const loader = document.getElementById('loader');
  const body = document.querySelector('body');

  loader.classList.toggle('hide');
  body.style.overflow = 'hidden';

  fetch(`https://api.weatherbit.io/v2.0/current?city=${Location}&key=bac6b91a15fa44c4887971ea442b8c83`)
  .then((res) => res.json())
  .then( (data) => {
      weatherArray.unshift(data);
      localStorage.setItem('weatherData', JSON.stringify(weatherArray));

      setTimeout(() => {
          location.reload();
      }, 3500);
  })
  .catch((error) => console.log(error));
};

export default getWeatherInfo;