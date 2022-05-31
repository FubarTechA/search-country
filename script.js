"use strict";
const countryFlag = document.querySelector(".country-flag");
const countryName = document.querySelector(".country-name");
const countryPopulation = document.querySelector(".country-population");
const countryRegion = document.querySelector(".country-region");
const countryCapital = document.querySelector(".country-capital");
const countryDiv = document.querySelector(".country-div");

const allcountry = async function () {
  const res = await fetch("https://restcountries.com/v3.1/all");
  //   console.log(res);
  const data = await res.json();
  console.log(data.map((country) => country.name.official));
  data.forEach((country) => {
    const markup = ` 
      <div class="country">
      <img src="${country.flags.png}" alt="" class="country-flag" />
              <div class="country-info">
                <h2 class="country-name">${country.name.official}</h2>
                <p>Population: <span class="country-population">${country.population}</span></p>
                <p>Region: <span class="country-region">${country.region}</span></p>
                <p>Capital: <span class="country-capital">${country.capital}</span></p>
              </div>
            </div>
      `;
    countryDiv.insertAdjacentHTML("beforeend", markup);
  });
};

allcountry();

const region = async function (reg) {
  const res = await fetch(`https://restcountries.com/v3.1/region/${reg}`);
  const data = await res.json();
  console.log(data.map((country) => country.name.official));
};

// region("asia");

const country = async function (name) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const data = await res.json();
  console.log(data[0]);
  countryName.textContent = data[0].name.official;
  const flag = data[0].flags.svg;
  countryFlag.setAttribute("src", flag);
  countryPopulation.textContent = data[0].population;
  countryRegion.textContent = data[0].region;
  countryCapital.textContent = data[0].capital[0];
};

// country("nigeria");
