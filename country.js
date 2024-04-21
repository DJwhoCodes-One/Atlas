let URL_Result = new URLSearchParams(window.location.search).get("name");
let current_Theme = new URLSearchParams(window.location.search).get("theme");

const flagImg = document.querySelector(".flag");
let countryName = document.querySelector(".countryName");
let nativeName = document.querySelector(".nativeName");
let population = document.querySelector(".population");
let region = document.querySelector(".region");
let subregion = document.querySelector(".subregion");
let capital = document.querySelector(".capital");
let topLevelDomain = document.querySelector(".topLevelDomain");
let currencies = document.querySelector(".currencies");
let languages = document.querySelector(".languages");
let borders = document.querySelector(".borders");

let URL = `https://restcountries.com/v3.1/name/${URL_Result}?fullText=True`;
fetch(URL)
  .then((res) => res.json())
  .then(([country]) => {
    flagImg.src = country?.flags?.svg;
    countryName.innerText = country.name.common;

    if (country.name.nativeName) nativeName.innerText = Object.values(country.name.nativeName)[0].official;
    else nativeName.innerText = country.name.common;

    population.innerText = country.population.toLocaleString("en-In");
    region.innerText = country.region;

    if (country.subregion) subregion.innerText = country.subregion;
    else subregion.innerText = "Does Not Exist!";

    if (country.capital?.[0]) capital.innerText = country.capital?.[0];
    else capital.innerText = "Does Not Exist!";

    if (country.tld) topLevelDomain.innerText = country.tld[0];
    else topLevelDomain.innerText = "Does Not Exist!";

    if (country.currencies) currencies.innerText = Object.values(country.currencies)?.[0]?.name;
    else currencies.innerText = "Does Not Exist!";

    if (country.languages) languages.innerText = Object.values(country.languages);
    else languages.innerText = "Does Not Exist!";

    let borderContainer = document.querySelector('.borderCountries');;
    if (country.borders) {
      const borderArr = country.borders;
      borderArr.forEach((element) => {
        const borderCountry = document.createElement('a');
        borderCountry.classList.add('btn');
        let borderURL = `https://restcountries.com/v3.1/alpha/${element}`;

        fetch(borderURL).then((res) => res.json()).then((data) => {
          let borderCountryName = data?.[0].name.common;
          borderCountry.href = `/country.html?name=${borderCountryName}`;
          borderCountry.innerHTML = borderCountryName;
        });

        borderContainer.append(borderCountry);
      });
    }
    else {
      borderContainer.innerText = "Does Not Exists!";
    }
  });

const themeSwitcher = document.querySelector('.themeSwitcher');
const themeName = document.querySelector('.themeName');


document.body.classList.add(current_Theme);
if (current_Theme === 'dark') {
  themeName.innerText = 'Light Mode'
}
else {
  themeName.innerText = 'Dark Mode'
}

themeSwitcher.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  current_Theme = document.body.classList.contains('dark') ? 'dark' : 'light';
  themeName.innerText = current_Theme === 'dark' ? 'Light Mode' : 'Dark Mode';
});