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

// allcountry();

const region = async function (reg) {
  const res = await fetch(`https://restcountries.com/v3.1/region/${reg}`);
  const data = await res.json();
  console.log(data.map((country) => country.name.official));
};

// region("asia");

const country = async function (name) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const data = await res.json();
  const country = data[0];
  console.log(country);

  const markup = `
<div class="detailimg-div">
<img src="${country.flags.svg}" alt="" class="detail-img" />
</div>
<div class="detail-info">
<div class="info-div">
  <div class="infoDiv1">
    <h2 class="detail-name">${country.name.official}</h2>
    <p>Native Name:<span class="detail-natName"></span></p>
    <p>Population:<span class="detail-population">${country.population}</span></p>
    <p>Region:<span class="detail-region">${country.region}</span></p>
    <p>Sub Region<span class="detail-subRegion"></span></p>
    <p>Capital:<span class="detail-capital">${country.capital}</span></p>
  </div>
  <div class="infoDiv2">
    <p>Top Level Domain<span class="detail-domain"></span></p>
    <p>Currencies<span class="detail-currency"></span></p>
    <p>Languages<span class="detail-languages"></span></p>
  </div>
</div>
<div class="detailborder-div">
  <p>Border countries</p>
  <div class="borders">
    <button class="border-country">France</button>
    <button class="border-country">Germany</button>
    <button class="border-country">Netherlands</button>
  </div>
</div>
</div>
`;
};

country("nigeria");
// const markup = `
// <div class="detailimg-div">
// <img src="" alt="" class="detail-img" />
// </div>
// <div class="detail-info">
// <div class="info-div">
//   <div class="infoDiv1">
//     <h2 class="detail-name">Belgium</h2>
//     <p>Native Name:<span class="detail-natName"></span></p>
//     <p>Population:<span class="detail-population"></span></p>
//     <p>Region:<span class="detail-region"></span></p>
//     <p>Sub Region<span class="detail-subRegion"></span></p>
//     <p>Capital:<span class="detail-capital"></span></p>
//   </div>
//   <div class="infoDiv2">
//     <p>Top Level Domain<span class="detail-domain"></span></p>
//     <p>Currencies<span class="detail-currency"></span></p>
//     <p>Languages<span class="detail-languages"></span></p>
//   </div>
// </div>
// <div class="detailborder-div">
//   <p>Border countries</p>
//   <div class="borders">
//     <button class="border-country">France</button>
//     <button class="border-country">Germany</button>
//     <button class="border-country">Netherlands</button>
//   </div>
// </div>
// </div>
// `;
