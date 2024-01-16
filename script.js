let movieList = document.getElementById("movieList");
let movieInfo = document.getElementById("movieInfo");
let favoritsList = [];

fetch(
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=88d6f906b386ac47c004701d8f545df8"
)
  .then((res) => res.json())
  .then((data) => {});

function printMovieList(movies) {
  movies.results.forEach((movie) => {
    let li = document.createElement("li");
    li.innerText = movie.original_title;

    li.addEventListener("click", () => {
      console.log("Klick på knapp", movie.id);
      printMovieInfo(movie);
    });

    movieList.appendChild(li);
  });
}

function printMovieInfo(movie) {
  movieInfo.innerHTML = "";

  let movieDiv = document.createElement("div");
  movieDiv.id = movie.id;
  let movieHeadline = document.createElement("h2");
  movieHeadline.innerText = movie.original_title;

  let movieText = document.createElement("p");
  movieText.innerText = movie.overview;

  let movieImg = document.createElement("img");
  movieImg.style.width = "500px";
  movieImg.src = "https:/image.tmdb.org/t/p/original/" + movie.poster_path;

  fetch(
    "https://api.themoviedb.org/3/movie/" +
      movie.id +
      "/similar?language=en-US&page=1&api_key=88d6f906b386ac47c004701d8f545df8"
  )
    .then((response) => response.json())
    .then((data) => {
      relatedMovie(data);
    });
  movieDiv.append(movieHeadline, movieText, movieImg);
  movieInfo.appendChild(movieDiv);
  addFavorite(movieDiv);
}

// Search
function searchMovie(search) {
  let movieSearch = document.getElementById("searchMovie").value;

  movieList.innerHTML = "";

  fetch(
    "https://api.themoviedb.org/3/search/movie?query=" +
      movieSearch +
      "&api_key=88d6f906b386ac47c004701d8f545df8"
  )
    .then((response) => response.json())
    .then((data) => {
      printMovieList(data);
    });
}

// Similiar
function relatedMovie(relatedMovies) {
  console.log("related", relatedMovies.results);
  let titelRelatedMovies = document.createElement("h2");
  titelRelatedMovies.innerText = "Liknande filmer:";

  let relatedUl = document.createElement("ul");
  movieInfo.append(titelRelatedMovies, relatedUl);

  relatedMovies.results.forEach((movie) => {
    let relatedLi = document.createElement("li");
    relatedLi.innerText = movie.original_title;
    relatedUl.appendChild(relatedLi);
  });
}

//add to favorites

function addFavorite(parent) {
  let favoritBtn = document.createElement("button");
  favoritBtn.innerHTML = "Lägg till i favoriter";
  parent.appendChild(favoritBtn);
  favoritBtn.addEventListener("click", () => {
    favoritsList.push(parent.id);
    localStorage.setItem("list of favorits", JSON.stringify(favoritsList));
    console.log(favoritsList);
  });
}
