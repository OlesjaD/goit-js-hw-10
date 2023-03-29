const BASE_URL = 'https://restcountries.com/v3.1';

function fetchCountries(valueCountry) {
   return fetch(`${BASE_URL}/name/${valueCountry}?fields=name,capital,population,flags,languages`)
    .then(response => { if(!response.ok) {
        return []}
    return response.json()}).catch(error => console.log("ERROR!"))
}

export default {fetchCountries};