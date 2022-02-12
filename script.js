"use strict";
const input = document.querySelector(".input");
const imgCont = document.querySelector(".img-cont");
const movieCotainer = document.querySelector(".container");
let publicKey = `****************************`;
let privateKey = `****************************`;
let searchResults = {};
let query = "";
const getRenderData = function () {
  const result = searchResults
    .map((el) => {
      return `
      <div class="movie-cont">
        <div class="img-cont">
            <img class="img" src="${el.img}.${el.extension}" alt="" />
        </div>
        <a class="movie-link" href="#">${el.title}</a>
        <p class="year">${new Date(el.date).getFullYear()}</p>
    </div>
    `;
    })
    .join("");
  return result;
};
const render = function () {
  input.value = "";
  movieCotainer.innerHTML = "";
  movieCotainer.insertAdjacentHTML("afterbegin", getRenderData());
};
const getData = async function (query) {
  try {
    const res = await fetch(
      `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${query}&limit=15&ts=1&apikey=${publicKey}&hash=fdc06ade42fbb7bab05ce1acc64e6371`
    );
    const data = await res.json();
    const { results } = data.data;
    searchResults = results.map(function (el) {
      return {
        title: el.name,
        extension: el.thumbnail.extension,
        img: el.thumbnail.path,
        date: el.modified,
      };
    });

    render();
  } catch (error) {
    console.log(error.message);
  }
};

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    query = input.value;
    getData(query);
  }
});
