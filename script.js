"use strict";
const countryFlag = document.querySelector(".country-flag");

const wrapper = document.querySelector(".wrapper");
const header = document.querySelector("header");
const input = document.querySelector("input");
const region = document.querySelector(".region");
const dropdown = document.querySelector(".dropdown");
const country = document.querySelectorAll(".country");
const dropdownIcon = document.querySelector(".dropdown-icon");
console.log(country);

const countryName = document.querySelector(".country-name");
const countryPopulation = document.querySelector(".country-population");
const countryRegion = document.querySelector(".country-region");
const countryCapital = document.querySelector(".country-capital");
const countryDiv = document.querySelector(".country-div");
const detailMain = document.querySelector(".detail-main");
const modeIcon = document.querySelector(".mode-icon");
const modeAside = document.querySelector(".mode-aside");
const modeSpan = document.querySelector(".mode-span");
console.log(modeAside);

const selectMode = function () {
  modeAside.addEventListener("click", function () {
    const country = document.querySelectorAll(".country");

    if (modeIcon.dataset.mode === "sun") {
      modeIcon.classList.remove("fa-moon");
      modeIcon.classList.add("fa-sun");
      modeSpan.textContent = "Light";
      modeIcon.dataset.mode = "moon";
    } else {
      modeIcon.classList.remove("fa-sun");
      modeIcon.classList.add("fa-moon");
      modeSpan.textContent = "Dark";
      modeIcon.dataset.mode = "sun";
    }
    wrapper.classList.toggle("light");
    header.classList.toggle("light");
    input.classList.toggle("light");
    region.classList.toggle("light");
    dropdown.classList.toggle("light");
    console.log(country);

    country.forEach((country) => country.classList.toggle("light"));
    console.log(input.getAttribute("placeholder"));
  });
};

region.addEventListener("click", function () {
  console.log("clicked");
  if (dropdown.classList.contains("show")) {
    dropdown.classList.remove("show");
    dropdownIcon.classList.remove("fa-angle-up");
    dropdownIcon.classList.add("fa-angle-down");
  } else {
    dropdown.classList.add("show");
    dropdownIcon.classList.add("fa-angle-up");
    dropdownIcon.classList.remove("fa-angle-down");
  }
});

if (country) {
  selectMode();
}

const allcountry = async function () {
  const res = await fetch("https://restcountries.com/v3.1/all");
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

const regionFunc = async function (reg) {
  const res = await fetch(`https://restcountries.com/v3.1/region/${reg}`);
  const data = await res.json();
  console.log(data.map((country) => country.name.official));
};

// region("asia");

const countryFunc = async function (name) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const data = await res.json();
  const country = data[0];
  console.log(country);
  console.log(Object.values(country.currencies)[0].name);
  console.log(
    country.borders
      .map((border) => `<button class="border-country">${border}</button>`)
      .join("")
  );
  const markup = `
<div class="detailimg-div">
<img src="${country.flags.svg}" alt="" class="detail-img" />
</div>
<div class="detail-info">
<div class="info-div">
  <div class="infoDiv1">
    <h2 class="detail-name">${country.name.official}</h2>
    <p>Native Name: <span class="detail-natName">${
      Object.values(country.name.nativeName)[
        Object.values(country.name.nativeName).length - 1
      ].common
    }</span></p>
    <p>Population: <span class="detail-population">${
      country.population
    }</span></p>
    <p>Region: <span class="detail-region">${country.region}</span></p>
    <p>Sub Region: <span class="detail-subRegion">${
      country.subregion
    }</span></p>
    <p>Capital: <span class="detail-capital">${country.capital}</span></p>
  </div>
  <div class="infoDiv2">
    <p>Top Level Domain: <span class="detail-domain">${country.tld}</span></p>
    <p>Currencies: <span class="detail-currency">${
      Object.values(country.currencies)[0].name
    }</span></p>
    <p>Languages: <span class="detail-languages">${Object.values(
      country.languages
    ).join(", ")}</span></p>
  </div>
</div>
<div class="detailborder-div">
  <p>Border countries</p>
  <div class="borders">
  ${country.borders
    .map((border) => `<button class="border-country">${border}</button>`)
    .join("")}
  </div>
</div>
</div>
`;
  detailMain.insertAdjacentHTML("beforeend", markup);
};

// country("china");
