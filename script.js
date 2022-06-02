"use strict";

// selecting elements
const countryFlag = document.querySelector(".country-flag");
// const button = document.queryselecctorAll("button");
const button = document.querySelectorAll("button");
const wrapper = document.querySelector(".wrapper");
const home = document.querySelector(".home");
const detail = document.querySelector(".detail");
const header = document.querySelector("header");
const input = document.querySelector("input");
const region = document.querySelector(".region");
const regionInfo = document.querySelector(".region-info");
const regionUl = document.querySelector(".region ul");
const dropdown = document.querySelector(".dropdown");
const dropdownLi = document.querySelectorAll(".dropdown li");
const country = document.querySelectorAll(".country");
const dropdownIcon = document.querySelector(".dropdown-icon");
const backBtn = document.querySelector(".backBtn");
const countryName = document.querySelector(".country-name");
const countryPopulation = document.querySelector(".country-population");
const countryRegion = document.querySelector(".country-region");
const countryCapital = document.querySelector(".country-capital");
const countryDiv = document.querySelector(".country-div");
const detailMain = document.querySelector(".detail-main");
const modeIcon = document.querySelector(".mode-icon");
const modeAside = document.querySelector(".mode-aside");
const modeSpan = document.querySelector(".mode-span");
const overlay = document.querySelector(".overlay");
const overlayDiv = document.querySelector(".overlay div");
const borderCountry = document.querySelectorAll(".border-country");

// functions

// to hide dropdown
const hideDropdown = function () {
  dropdown.classList.remove("show");
  dropdownIcon.classList.remove("fa-angle-up");
  dropdownIcon.classList.add("fa-angle-down");
};

// to show dropdown
const showDropDown = function () {
  dropdown.classList.add("show");
  dropdownIcon.classList.add("fa-angle-up");
  dropdownIcon.classList.remove("fa-angle-down");
};

// function for error whenever the fetch request is not fulfilled
const renderError = function (message) {
  overlay.classList.add("show");
  overlayDiv.classList.add("show");
  const para = overlayDiv.querySelector("p");
  para.textContent = message;
};

// function to displayCountries on home page
const displayCountries = function (info) {
  const markup = ` 
  <div class="country ${wrapper.classList.contains("light") ? "light" : ""}">
  <img src="${info.flags.png}" alt="" class="country-flag" />
          <div class="country-info">
            <h2 class="country-name">${info.name.official}</h2>
            <p>Population: <span class="country-population">${new Intl.NumberFormat(
              "en-US"
            ).format(info.population)}</span></p>
            <p>Region: <span class="country-region">${info.region}</span></p>
            <p>Capital: <span class="country-capital">${
              info.capital ? info.capital : "Not Available"
            }</span></p>
          </div>
        </div>
  `;
  countryDiv.insertAdjacentHTML("beforeend", markup);
};

const displayParticularCountry = function (country) {
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
    <p>Population: <span class="detail-population">${new Intl.NumberFormat(
      "en-US"
    ).format(country.population)}</span></p>
    <p>Region: <span class="detail-region">${country.region}</span></p>
    <p>Sub Region: <span class="detail-subRegion">${
      country.subregion ? country.subregion : "Not Available"
    }</span></p>
    <p>Capital: <span class="detail-capital">${
      country.capital ? country.capital : "Not Available"
    }</span></p>
  </div>
  <div class="infoDiv2">
    <p>Top Level Domain: <span class="detail-domain">${country.tld}</span></p>
    <p>Currencies: <span class="detail-currency">${
      country.currencies
        ? Object.values(country.currencies)[0].name
        : "No Official Currency"
    }</span></p>
    <p>Languages: <span class="detail-languages">${Object.values(
      country.languages
    ).join(", ")}</span></p>
  </div>
</div>
<div class="detailborder-div">
  <p>Border countries:</p>
  <div class="borders">
  ${
    country.borders
      ? country.borders
          .map(
            (border) =>
              `<button class="border-country ${
                wrapper.classList.contains("light") ? "light" : ""
              }">${border}</button>`
          )
          .join("")
      : "None"
  }
  </div>
</div>
</div>
`;
  detailMain.insertAdjacentHTML("beforeend", markup);
};

const displayborderCountry = function (country) {
  const markup = `
<div class="detailimg-div">
<img src="${country.flags.svg}" alt="" class="detail-img" />
</div>
<div class="detail-info">
<div class="info-div">
  <div class="infoDiv1">
    <h2 class="detail-name">${country.name}</h2>
    <p>Native Name: <span class="detail-natName">${
      country.nativeName
    }</span></p>
    <p>Population: <span class="detail-population">${new Intl.NumberFormat(
      "en-US"
    ).format(country.population)}</span></p>
    <p>Region: <span class="detail-region">${country.region}</span></p>
    <p>Sub Region: <span class="detail-subRegion">${
      country.subregion ? country.subregion : "Not Available"
    }</span></p>
    <p>Capital: <span class="detail-capital">${
      country.capital ? country.capital : "Not Available"
    }</span></p>
  </div>
  <div class="infoDiv2">
    <p>Top Level Domain: <span class="detail-domain">${
      country.topLevelDomain
    }</span></p>
    <p>Currencies: <span class="detail-currency">${
      country.currencies
        ? Object.values(country.currencies)[0].name
        : "No Official Currency"
    }</span></p>
    <p>Languages: <span class="detail-languages">${country.languages
      .map((language) => language.name)
      .join(", ")}</span></p>
  </div>
</div>
<div class="detailborder-div">
  <p>Border countries:</p>
  <div class="borders">
  ${
    country.borders
      ? country.borders
          .map(
            (border) =>
              `<button class="border-country ${
                wrapper.classList.contains("light") ? "light" : ""
              }">${border}</button>`
          )
          .join("")
      : "None"
  }
  </div>
</div>
</div>
`;
  detailMain.insertAdjacentHTML("beforeend", markup);
};

// function for displaying all countries on load
const allcountry = async function () {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    if (!res.ok) throw new Error("Check your internet connection");
    const data = await res.json();
    data.forEach((country) => {
      displayCountries(country);
    });
  } catch (err) {
    // alert(err.message);
    renderError();
  }
};

// function that gets countries according to region
const regionFunc = async function (reg) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/region/${reg}`);
    if (!res.ok) throw new Error("check your internet connection");
    const data = await res.json();
    data.forEach((country) => {
      displayCountries(country);
    });
  } catch (err) {
    renderError(err.message);
  }
};

// displaying particular country

const countryFunc = async function (name) {
  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (!res.ok)
      throw new Error(
        "The Country name is incorrect or Check your internet connection"
      );
    const data = await res.json();
    const country = data[0];
    console.log();
    displayParticularCountry(country);
  } catch (err) {
    renderError(err.message);
  }
};

const borderFunc = async function (border) {
  try {
    const res = await fetch(`https://restcountries.com/v2/alpha/${border}`);
    if (!res.ok) throw new Error("Check your internet connection");
    const data = await res.json();
    const country = data;
    console.log(country);
    displayborderCountry(country);
  } catch (err) {
    renderError(err.message);
  }
};

// borderFunc("BFA");

// function for displaying the detail page
const displayDetail = function () {
  home.classList.add("hide");
  detail.classList.remove("hide");
};

// function for toggling between light and dark mode
const selectMode = function () {
  modeAside.addEventListener("click", function () {
    const country = document.querySelectorAll(".country");
    const bordercountry = document.querySelectorAll(".border-country");
    // adding all the elements that the light class will be toggled on
    const arr = [wrapper, header, input, region, backBtn, detail, dropdown];

    // adding the dropdownli and country nodelist plus the arr array into a new arr
    const secondArr = [arr, dropdownLi, country, bordercountry];

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

    // looping through the secondArr and using the forEach method on each individual array
    secondArr.forEach((arr) =>
      arr.forEach((element) => element.classList.toggle("light"))
    );
  });
};

allcountry();
selectMode();

regionInfo.addEventListener("click", function () {
  if (dropdown.classList.contains("show")) {
    hideDropdown();
  } else {
    showDropDown();
  }
});

regionUl.addEventListener("click", function (e) {
  const listitem = e.target.closest("li");
  if (!listitem) return;

  // selecting the region
  const region = listitem.textContent;

  // deleting the html from the countrydiv
  countryDiv.innerHTML = "";

  // displaying countries based on region selected
  regionFunc(region);

  // hiding the dropdown
  hideDropdown();
});

// adding and removing the hover effect on the dropdown li
regionUl.addEventListener("mouseover", function (e) {
  const listitem = e.target.closest("li");
  if (!listitem) return;
  listitem.classList.add("hover");
});

regionUl.addEventListener("mouseout", function (e) {
  const listitem = e.target.closest("li");
  if (!listitem) return;
  listitem.classList.remove("hover");
});

// removing the placeholder on focus
input.addEventListener("focus", function () {
  input.removeAttribute("placeholder");
});

document.addEventListener("keydown", function (e) {
  // e.preventDefault();
  if (e.key === "Enter") {
    e.preventDefault();
    const country = input.value;
    input.value = "";
    input.setAttribute("placeholder", "Search for a country...");
    // display the detail page
    displayDetail();
    countryFunc(country);
  }
});

countryDiv.addEventListener("click", function (e) {
  const country = e.target.closest(".country");
  if (!country) return;

  // selecting the country
  const countryName = country.querySelector("h2").textContent;

  displayDetail();

  // displaying the country info
  countryFunc(countryName);
});

detailMain.addEventListener("click", function (e) {
  // selecting border country
  const borderCountry = e.target.closest(".border-country").textContent;

  // deleting all html in the detail main section
  detailMain.innerHTML = "";

  // dislplaying border country
  borderFunc(borderCountry);
});

backBtn.addEventListener("click", function () {
  detailMain.innerHTML = "";

  // showing the home page
  home.classList.remove("hide");
  detail.classList.add("hide");
});

overlay.addEventListener("click", function () {
  overlay.classList.remove("show");
  overlayDiv.classList.remove("show");
  home.classList.remove("hide");
  detail.classList.add("hide");
});
