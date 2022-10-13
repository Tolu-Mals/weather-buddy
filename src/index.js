import './style.scss';

//NAVBAR
const nav = document.getElementById('nav');
const navBar = document.getElementById('nav-bar');
const container = document.getElementById('container');
const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    navBar.classList.toggle('open');
    container.classList.toggle('open');
    hamburger.classList.toggle('open');
});


//The div where our result will be stored
const results = document.getElementById('results');


//WORKING WITH THE API
const locationSubmitBtn = document.getElementById('location-submit');

let locationField = document.getElementById('location-field');

let weatherArray = JSON.parse(localStorage.getItem('weatherData')) || [];


document.addEventListener('DOMContentLoaded', () => {
    getWeatherContent(weatherArray);
    console.log(weatherArray);
});


//We get the api weather data from the local storage, and then put into our html template
const getWeatherContent = (arr) => {
    let mappedArr = arr.map(({data}) => {
        return `
        <div class="result">
            <h2 id="name"><span class='location-name'>${data[0].city_name}</span>, ${data[0].country_code}</h2>
            <div class="top-result">
                <p id="temp">${data[0].temp}&deg;C</p>

                <div>
                    <p id="app-temp"><span class="iconify" data-inline="false" data-icon="fluent:temperature-20-filled" style="color: #ffffff; font-size: 20px;"></span>Feels like ${data[0].app_temp}&deg;C</p>
                    <p id="weather-descr"><span class="iconify" data-inline="false" data-icon="bi:cloud-fill" style="color: #ffffff; font-size: 20px;"></span>${data[0].weather.description}</p>
                </div>
            </div>
            <div class="weather-details">
                <div class="weather-detail">
                    <p class="label">Wind speed: 
                        <span class="value" id="wind-speed">${data[0].wind_spd}m/s</span>
                    </p>
                </div>
                <div class="weather-detail">
                    <p class="label">Wind Direction: 
                        <span class="value" id="wind-direction">${data[0].wind_dir}&deg;</span>
                    </p>
                </div><div class="weather-detail">
                    <p class="label">Relative Humidity:
                        <span class="value" id="rel-humidity">${data[0].rh}%</span>
                    </p>
                </div><div class="weather-detail">
                    <p class="label">Visibility:
                        <span class="value" id="visibility">${data[0].vis}KM</span>
                    </p>
                </div><div class="weather-detail">
                    <p class="label">UV Index: 
                        <span class="value" id="uv-index">${data[0].uv}</span>
                    </p>
                </div><div class="weather-detail">
                    <p class="label">Dew point:
                        <span class="value" id="dew-point">${data[0].dewpt}</span>
                    </p>
                </div>
            </div>

            <a class="map-link"><span class="iconify" data-inline="false" data-icon="entypo:map" style="color: #ffffff; font-size: 20px;"></span> See Map</a>
        </div>`;
    });

    mappedArr = mappedArr.join('');
    results.innerHTML = mappedArr;
};


const getWeatherInfo = (Location) => {
    fetch(`https://api.weatherbit.io/v2.0/current?city=${Location}&key=bac6b91a15fa44c4887971ea442b8c83`)
    .then((res) => res.json())
    .then( (data) => {
        weatherArray.unshift(data);
        console.log(`Submitted: ${Location}`);
        console.log(weatherArray);
        localStorage.setItem('weatherData', JSON.stringify(weatherArray));

        setTimeout(() => {
            location.reload();
        }, 3500);
    })
    .catch((error) => console.log(error));

};

locationSubmitBtn.addEventListener('click', (e) => {
    let location = locationField.value;
    e.preventDefault();

    //Get weather info from api
    getWeatherInfo(location);

    locationField.value = '';
});



document.addEventListener('DOMContentLoaded', (map) => {
    let locationMap = document.getElementById('location-map');
    let mapFrame = document.getElementById('map');
    let locations = document.querySelectorAll('.location-name');
    let mapLinks = document.querySelectorAll('.map-link');
    let closeMap = document.getElementById('close-map');

    mapLinks.forEach((link, index) => {
        link.addEventListener('click', () =>{
            locationMap.style.display = 'block';
            mapFrame.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCgCkXxQPZQ64c1qsUeD2HWwjrwZnVNR5E&q=${locations[index].innerText}`;
        })
    });

    closeMap.onclick = function (){
        locationMap.style.display = 'none';
    };
});
