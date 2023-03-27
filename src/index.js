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

function onSearchCountry() {
    const valueCountry = refs.input.value.trim();
    console.log(valueCountry);
    fetchCountries(valueCountry);

    if (countries.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    } else if (countries.length >= 2 && countries.length <= 10) {
        renderCountriesList(countries);
    } else if (valueCountry === 0) {
        refs.list.innerHTML = "";
        refs.info.innerHTML = "";
    } else if (valueCountry != countries) {
        Notiflix.Notify.failure("Oops, there is no country with that name")
    }
    else {
        renderCountryInfo(countries);
    }    
};
function fetchCountries() {
   return fetch('https://restcountries.eu/rest/v2/all?fields=name,capital,population,flags,languages')
    .then(r => r.json())
    .then(countries => {console.log(countries);})
    .catch(error => {console.log(error);})
}

function renderCountriesList(countries) {
    const markupList = countries
        .map(({name, flags}) => {
            return `
                <li class="country-list__item">
                    <img src="${flags.svg}" alt="flags counrty"/>
                    <p>${name.official}</p>
                </li>
            `;
        }).join("");
    refs.list.innerHTML = markupList;
}

function renderCountryInfo(countries) {
    const markupInfo = countries 
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
    for (const country of countries) {
        refs.info.innerHTML = markupInfo;
    }
}