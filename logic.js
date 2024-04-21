const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector('.filter');
const searchInput = document.querySelector('.searchInput');

var current_Theme;
const themeSwitcher = document.querySelector('.themeSwitcher');
const themeName = document.querySelector('.themeName');

themeSwitcher.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    themeName.innerText = 'Light Mode';
    current_Theme = 'dark';
  } else {
    themeName.innerText = 'Dark Mode';
    current_Theme = 'light';
  }

  // Update href attribute of country cards when theme is toggled
  const countryCards = document.querySelectorAll('.country-card');
  countryCards.forEach(countryCard => {
    const countryName = countryCard.href.split('?name=')[1].split('&')[0]; // Extract country name from href
    countryCard.href = `/country.html?name=${countryName}&theme=${current_Theme}`;
  });
});

function renderCards(countriesArray) {
  data = countriesArray;
  data.forEach((country) => {
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");

    // Set href attribute with an initial theme value
    countryCard.href = `/country.html?name=${country.name.common}&theme=${current_Theme || 'light'}`;

    const cardHTML = `
        <img src="${country.flags.svg}" alt="flag" />
        <div class="card-text">
            <h3>${country.name.common}</h3>
            <p><b>Population:</b> ${country.population.toLocaleString(
      "en-IN"
    )}</p>
            <p><b>Region:</b> ${country.region}</p>
            <p><b>Capital:</b> ${country.capital ? country.capital[0] : "Does Not Exist!"}</p>
        </div>
    `;
    countryCard.innerHTML = cardHTML;

    countriesContainer.append(countryCard);
  });
}

// _____________________________________ Fetching Data From API _____________________________________

const URL = "https://restcountries.com/v3.1/all";

let searchCountries;
fetch(URL)
  .then((res) => res.json())
  .then((data) => {
    renderCards(data);
    searchCountries = data;
    searchCountries.includes(searchInput);
  });


filterByRegion.addEventListener('change', (e) => {
  const URL = `https://restcountries.com/v3.1/region/${e.target.value}`;

  countriesContainer.innerHTML = '';

  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      renderCards(data);
    });
})

searchInput.addEventListener('input', (e) => {
  console.log(e.target.value);
  const searchedCountry = searchCountries.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
  // console.log(searchedCountry);

  countriesContainer.innerHTML = '';

  renderCards(searchedCountry);
})
