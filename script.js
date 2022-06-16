//API key 
const apiKey= "be8ae1c7519989b52d8ecbf396d76b45";
 
var moviePoster = `https://www.themoviedb.org/t/p/w440_and_h660_face`;

// Using DOM to create a reference for each item
//const movieSearch = document.querySelector("#movieSearch");
const submitButton = document.querySelector("#submitButton");
const movieResults = document.querySelector(".movieResults");

 //API URL
//var api_url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieSearch}&pages=1&include_adult=false`;


// This function is one that gets results from the API and it uses the fetch method with my custom HTTP request.
async function getResults(event){
    event.preventDefault();
    try{
        var api_url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${movieSearch.value}&pages=1&include_adult=false`;
        let response = await fetch(api_url);

        console.log("response is: ", response);

        let responseData = await response.json();

        console.log("responseData is: ", responseData);

        displayMovies(responseData);
    } catch (e) {
        console.log();}
    }

    //fetch(api_url)
        //.then(responce => responce.json)
        //.then(data => console.log(data))
        
window.onload = () => {
    console.log("Hey");
    const searchMovies = document.querySelector("#searchMovies");
    searchMovies.addEventListener("submit", getResults);
    const movieSearch = document.querySelector("#movieSearch").value;
    console.log(movieSearch);
    }

// Image is not displaying at all ?
function displayMovies (responseData){
    responseData.data.forEach(element => {
    movieResults.innerHTML =+ `<img src = "${moviePoster+element.image.poster_path}">`
    });
}

