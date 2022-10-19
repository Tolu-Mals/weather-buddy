import './style.scss';
import renderWeatherData from './renderWeatherData';
import getWeatherInfo from './getWeatherInfo';

const mapboxgl = require('mapbox-gl');
mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

//NAVBAR
const nav = document.getElementById('nav');
const navBar = document.getElementById('nav-bar');
const container = document.getElementById('container');
const hamburger = document.getElementById('hamburger');

//The div where our result will be stored
const results = document.getElementById('results');

//Form
const locationSubmitBtn = document.getElementById('location-submit');
let locationField = document.getElementById('location-field');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    navBar.classList.toggle('open');
    container.classList.toggle('open');
    hamburger.classList.toggle('open');
});

let weatherArray = JSON.parse(localStorage.getItem('weatherData')) || [];

document.addEventListener('DOMContentLoaded', () => {
    renderWeatherData(weatherArray);

    const hasVisitedPage = localStorage.getItem('hasVisitedPage');

    if(hasVisitedPage && weatherArray.length > 0){
        results.scrollIntoView();
    } else {
        localStorage.setItem('hasVisitedPage', 'true');
    }
});

locationSubmitBtn.addEventListener('click', (e) => {
    let location = locationField.value;
    e.preventDefault();

    //Get weather info from api
    getWeatherInfo(location, weatherArray);

    locationField.value = '';
});

document.addEventListener('DOMContentLoaded', (map) => {
    let locationMap = document.getElementById('location-map');

    let mapLinks = document.querySelectorAll('.map-link');
    const closeButton = document.querySelector('#close-button');

    closeButton.onclick = () => {
        locationMap.style.display = 'none';
    }

    mapLinks.forEach((link, index) => {
        const locations = document.querySelectorAll('.location');

        link.addEventListener('click', async () =>{
            const location = locations[index].innerText;
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}`)
            const data = await response.json();

            const { features } = data;
            const { center } = features.at(0);

            locationMap.style.display = 'block';

            const map = new mapboxgl.Map({
                container: 'map',
                center: center,
                style: 'mapbox://styles/mapbox/streets-v11',
                zoom: 11,
            });
        })
    });

});