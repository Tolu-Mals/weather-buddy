import './style.scss';

const nav = document.getElementById('nav');
const navBar = document.getElementById('nav-bar');
const container = document.getElementById('container');
const hamburger = document.getElementById('hamburger');


//Testing stuff out
// console.log(nav, navBar, container);

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    navBar.classList.toggle('open');
    container.classList.toggle('open');
    hamburger.classList.toggle('open');
});
