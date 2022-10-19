const renderWeatherData = (arr) => {
  let mappedArr = arr.map(({data}) => {
      return `
      <div class="result">
          <div>
              <h2 id="name" class="location"><span class='location-name'>${data?.at(0)?.city_name}</span>, ${data?.at(0)?.country_code}</h2>
              <div class="top-result">
                  <p id="temp">${data?.at(0)?.temp}&deg;C</p>

                  <div>
                      <p id="app-temp"><span class="iconify" data-inline="false" data-icon="fluent:temperature-20-filled" style="color: #ffffff; font-size: 20px;"></span>Feels like ${data?.at(0)?.app_temp}&deg;C</p>
                      <p id="weather-descr"><span class="iconify" data-inline="false" data-icon="bi:cloud-fill" style="color: #ffffff; font-size: 20px;"></span>${data?.at(0)?.weather.description}</p>
                  </div>
              </div>
              <div class="weather-details">
                  <div class="weather-detail">
                      <p class="label">Wind speed: 
                          <span class="value" id="wind-speed">${data?.at(0).wind_spd}m/s</span>
                      </p>
                  </div>
                  <div class="weather-detail">
                      <p class="label">Wind Direction: 
                          <span class="value" id="wind-direction">${data?.at(0).wind_dir}&deg;</span>
                      </p>
                  </div><div class="weather-detail">
                      <p class="label">Relative Humidity:
                          <span class="value" id="rel-humidity">${data?.at(0)?.rh}%</span>
                      </p>
                  </div><div class="weather-detail">
                      <p class="label">Visibility:
                          <span class="value" id="visibility">${data?.at(0)?.vis}KM</span>
                      </p>
                  </div><div class="weather-detail">
                      <p class="label">UV Index: 
                          <span class="value" id="uv-index">${data?.at(0)?.uv}</span>
                      </p>
                  </div><div class="weather-detail">
                      <p class="label">Dew point:
                          <span class="value" id="dew-point">${data?.at(0)?.dewpt}</span>
                      </p>
                  </div>
              </div>
          </div>

          <a class="map-link"><span class="iconify" data-inline="false" data-icon="entypo:map" style="color: #ffffff; font-size: 20px;"></span> See Map</a>
      </div>`;
  });

  mappedArr = mappedArr.join('');
  results.innerHTML = mappedArr;
};

export default renderWeatherData;