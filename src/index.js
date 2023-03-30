import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from '../src/fetchCountries'
import './css/styles.css';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
};

let valueCountry = "";
refs.input.addEventListener('input', debounce(onSearchCountry, DEBOUNCE_DELAY));

function onSearchCountry(valueCountry) {
    valueCountry = refs.input.value.trim();
    console.log(valueCountry);
    API.fetchCountries(valueCountry)
    .then(countries => {
        console.log(countries)
        if (countries.length > 10) {
            clearValueCountries(); 
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");}
        else if (countries.length >= 2 && countries.length <= 10) { clearValueCountries(); renderCountriesList(countries);}
        else if (countries.length === 1) {
            clearValueCountries();
            renderCountryInfo(countries);
        }     
        else {clearValueCountries();  onFetchError();}
    })
    .catch(error =>console.log(error));
}

function renderCountriesList(countries) {
    const markupList = countries
        .map(({name, flags}) => {
            return `
                <div class="country-list__item">
                    <img src="${flags.svg}" alt="flags counrty" width=60px height=40px/>
                    <span>${name.official}</span>
                </div>
            `;
        }).join("");
    refs.list.insertAdjacentHTML('beforeend', markupList);
}

function renderCountryInfo(countries) {
    const markupInfo = countries 
        .map(({name, capital, population, flags, languages}) => {
            return `
                <div class="country-info__details">
                <img src="${flags.svg}" alt="flags counrty" width=240px height=140px/>
                <h2>${name.official}</h2>
                
                <p>Capital: ${capital}</p>
                <p>Population: ${population}</p>
                <p>Languages: ${Object.values(languages)}</p>
                </div>
            `;
        }).join("");
    
        refs.info.insertAdjacentHTML('beforeend', markupInfo);
}

function onFetchError() {
    Notiflix.Notify.failure("Oops, there is no country with that name");
}
function clearValueCountries() {
    refs.list.innerHTML = "";
    refs.info.innerHTML = "";
}
