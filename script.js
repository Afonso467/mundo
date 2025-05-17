const API_COUNTRIES = 'https://restcountries.com/v3.1/all';
const API_FAVORITES = 'https://your-mockapi-url.io/favorites'; 

const countriesList = document.getElementById('countries-list');
const favoritesList = document.getElementById('favorites-list');
const searchInput = document.getElementById('search');

let countries = [];

fetch(API_COUNTRIES)
  .then(res => res.json())
  .then(data => {
    countries = data;
    renderCountries(data);
  });

function renderCountries(list) {
  countriesList.innerHTML = '';
  list.forEach(country => {
    const card = document.createElement('div');
    card.className = 'country-card';
    card.innerHTML = `
      <h3>${country.name.common}</h3>
      <img src="${country.flags.png}" alt="Bandeira de ${country.name.common}" />
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
      <p><strong>População:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Região:</strong> ${country.region}</p>
    `;
    countriesList.appendChild(card);
  });
}

searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(term)
  );
  renderCountries(filtered);
});




