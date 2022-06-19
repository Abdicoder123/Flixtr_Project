// The constants 
let page_num =1;
// The search input
let search_movie = '';
//API key and all the urls being used in the project, I'm thinking of a different route then hard coding.
const apiKey= "be8ae1c7519989b52d8ecbf396d76b45";
const now_playing_url = "https://api.themoviedb.org/3/movie/now_playing?&api_key=";
const moviePoster = `https://www.themoviedb.org/t/p/w440_and_h660_face`;
const search_movie_url = 'https://api.themoviedb.org/3/search/movie?api_key=';

// Using DOM to create a reference for each item
//const movieSearch = document.querySelector("#movieSearch");
const submitButton = document.querySelector("#submitButton");
const movieResults = document.querySelector(".movieResults");
const movieInput = document.querySelector("#search-input");
const searchForm = document.querySelector("#searchForm");
const movieDisplay = document.querySelector("#movie-card");
const moreMovies = document.querySelector("#load-more-movies-btn");
const clearMovies = document.querySelector(".clear-search");

 //API URL
//var api_url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieSearch}&pages=1&include_adult=false`;

// What we first see on the page
async function firstPage(event){
    const response = await fetch(search_movie_url + apiKey + "&query=" + event + "&page=" + page_num);
    const responseData = await response.json();
    const data = responseData.results
    console.log(data)
    data.forEach(element => displayMovie(element));

}
// Displays now playing
async function getResults(){
    const api_url = now_playing_url + apiKey + "&q=" +  search_movie + "&language=en-US&page=" + page_num;
    const response = await fetch(api_url);
    const responseData = await response.json();
    const data = responseData.results;
    data.forEach(element => displayMovie(element));
}
// This function is one that gets results from the API and it uses the fetch method with my custom HTTP request.
// // async function getResults(event){
//     event.preventDefault();
//     try{
//         //var api_url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieSearch.value}&pages=1&include_adult=false`;
//         let response = await fetch(api_url);

//         console.log("response is: ", response);

//         let responseData = await response.json();

//         console.log("responseData is: ", responseData);

//         displayMovies(responseData);
//     } catch (e) {
//         console.log();}
//     }

    //fetch(api_url)
        //.then(responce => responce.json)
        //.then(data => console.log(data))
        
// window.onload = () => {
//     console.log("Hey");
//     //const searchMovies = document.querySelector("#searchMovies");
//     searchMovies.addEventListener("submit", getResults);
//    const movieSearch = document.querySelector("#movieSearch").value;
//     console.log(movieSearch);
//     }

// Image is not displaying at all ?
function displayMovie(event) {
    movieDisplay.innerHTML+= `
    <div class="movies">
    <img class="movie-poster" src="https://image.tmdb.org/t/p/w500${event.poster_path} "alt=${event.title} width="190"/>
    <div class="movieInfo">
        <span class ="movie-title" style="color: black; "> ${event.title}</span> 
        <div class="movie-vote-wrapper">
        <span id="movie-votes" style="color: ${(event.vote_average)};">${event.vote_average}<i style="color:${event.vote_average};" class="fa fa-star"></i> </span>
        </div> 
    </div>
    </div>
    `
}

moreMovies.addEventListener('click', getMoreMovies);
function getMoreMovies(event){
    event.preventDefault();
    page_num++ ;
    if(movieInput.value == ''){

        getResults();
    }

    else{
        page_num++ ;
        firstPage(movieInput.value);
    }
}

clearMovies.addEventListener('click', clearBtn)
function clearBtn(event){
    if(movieInput.value){
        movieInput.value = "";
        movieDisplay.innerHTML = "";
        getResults(event);
    }
}

async function submit(event){
    event.preventDefault();
    movieDisplay.innerHTML = '';
    search_movie = movieInput.value;
    const results = await firstPage(search_movie);
    displayMovie(results);
    movieInput.value = '';
}

searchForm.addEventListener('submit', submit);
getResults()