import './style.scss';

const mapboxgl = require('mapbox-gl');
mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

document.addEventListener('DOMContentLoaded', async() => {
    //Check if there's any weather data stored in localStorage
    let weatherArray = JSON.parse(localStorage.getItem('weatherData')) || [];

    //navbar related selectors
    const nav = document.getElementById('nav');
    const navBar = document.getElementById('nav-bar');
    const container = document.getElementById('container');
    const hamburger = document.getElementById('hamburger');

    //The div where our result will be stored
    const results = document.getElementById('results');

    //Form related selectors
    const locationSubmitBtn = document.getElementById('location-submit');
    let locationField = document.getElementById('location-field');

    //Render the weather data on the app
    const { default: renderWeatherData} = await import('./renderWeatherData');
    renderWeatherData(weatherArray);

    //If the user is not a first time user, scroll to the weather info
    const hasVisitedPage = localStorage.getItem('hasVisitedPage');
    if(hasVisitedPage && weatherArray.length > 0){
        results.scrollIntoView();
    } else {
        //Update the data that monitors when a user is new
        localStorage.setItem('hasVisitedPage', 'true');
    }

    //Map related selectors
    let locationMap = document.getElementById('location-map');

    let mapLinks = document.querySelectorAll('.map-link');
    const closeButton = document.querySelector('#close-button');

    closeButton.onclick = () => {
        locationMap.style.display = 'none';
    }

    mapLinks.forEach((link, index) => {
        const locations = document.querySelectorAll('.location');
        //Display the map when we click the "See map" links ie .map-link
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

    //Toggle the mobile navbar when clicked
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('open');
        navBar.classList.toggle('open');
        container.classList.toggle('open');
        hamburger.classList.toggle('open');
    });

    //Get weather data for new location when you submit
    locationSubmitBtn.addEventListener('click', async (e) => {
        let location = locationField.value;
        e.preventDefault();

        //If no location was entered exit the function
        if(!location) return;

        const { default: getWeatherInfo } = await import('./getWeatherInfo');
        //Get weather info from api
        getWeatherInfo(location, weatherArray);

        locationField.value = '';
    });
});