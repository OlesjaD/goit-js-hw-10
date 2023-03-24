import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(ev) {
    ev.preventDefault();
    const valueCountry = refs.input.value.trim();
    console.log(valueCountry);

    if (valueCountry.lengt <= 1) {
        Notiflix.Notify("Too many matches found. Please enter a more specific name.");
    } else if (valueCountry === country) {
        refs.info.insertAdjacentHTML('beforeend', markupInfo(country));
    } else {
        refs.list.insertAdjacentHTML('beforeend', markupList(country));
    }
    
    fetchCountries();
};
function fetchCountries(name) {
    fetch('https://restcountries.com/v3.1/all?fields=name,capital,population,flags,languages')
    .then(r => r.json())
    .then(country => {console.log(country);})
    .catch(error => {console.log(error);})
}

// 'https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags.svg,languages'

function markupList(country) {
    return country 
        .map(({name, flags}) => {
            return `
                <li class="country-list__item">
                    <img src="${flags.svg}" alt="flags counrty"/>
                    <p>${name.official}</p>
                </li>
            `;
        }).join("");
};

function markupInfo(country) {
    return country 
        .map(({name, capital, population, flags, languages}) => {
            return `
                <h2 class="country-info__details">
                    <img src="${flags.svg}" alt="flags counrty"/>
                    <p>${name.official}</p>
                </h2>
                <p>Capital: ${capital}</p>
                <p>Population: ${population}</p>
                <p>Languages: ${languages}</p>
            `;
        }).join("");
}