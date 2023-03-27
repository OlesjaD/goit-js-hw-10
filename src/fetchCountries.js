const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(name) {
   return fetch('${BASE_URL}/name/${valueCountry}?fields=name,capital,population,flags,languages')
    .then(response => response.json())
}

export default {fetchCountries};