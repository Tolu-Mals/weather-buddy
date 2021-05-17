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


//APIS
const getWeatherBtn = document.getElementById('get-weather-btn');

const getIP = () => {
    fetch('https://api.bigdatacloud.net/data/client-ip')
    .then((res)=> res.json())
    .then((data) => console.log(data))
    .catch((err) => {
        console.log(err);
    });
};

getWeatherBtn.addEventListener('click', () => {
    getIP();
});