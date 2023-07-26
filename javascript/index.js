const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=fe1a4da6s=";
const API_URL_SEARCH = "http://www.omdbapi.com/?apikey=fe1a4da6i=";

let search_input = document.getElementById("search_input");
let card = document.getElementsByClassName("movie_cards")[0];

document.getElementsByClassName("search")[0].addEventListener("click", function () {
    console.log(search_input.value);
    const query = search_input.value;
    if (query) {
        getMovies(API_URL + query);
    }
});

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.Search);
}

function showMovies(movies) {
    card.innerHTML = "";
    movies.forEach(async function (movie) {
        const movieData = await fetch(API_URL_SEARCH + movie.imdbID);
        const movieDataobj = await movieData.json();
        movie_display(movieDataobj);
    });
}

function movie_display(imovie) {
    const movieElm = document.createElement("div");
    movieElm.cllassList.add("mobie_card");
    movieElm.innerHTML = `
        <div class = "card">
            <img src = "${imovie.Poster}" alt = "Poster" width = "300px" height = "300px"/>
            <br>
            <div class = "movie_discription">
                <div class = "movie_title><b>Title</b><div class = "value">${imovie.Title}</div></div>
                <div class = "movie_title><b>Rating</b><div class = "value">${imovie.imdbRating}</div></div>
                <div class = "movie_title><b>Director</b><div class = "value">${imovie.Director}</div></div>
                <div class = "movie_title><b>Released Date</b><div class = "value">${imovie.Released}</div></div>
                <div class = "movie_title><b>Genre</b><div class = "value">${imovie.Genre}</div></div>
            </div>
        </div>
    `;
    card.appendChild(movieElm)
}
