const moviesObjArray = [];
const searchFormEl = document.getElementById('search-form');

searchFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    getMovies();
})

async function getMovies() {
    const searchInputValue = document.getElementById('search-input').value.trim();
    /* fetching movie titles search data */
    const response = await fetch(`http://www.omdbapi.com/?apikey=f115e7ce&s=${searchInputValue}`, {method:"GET"});
    const data = await response.json();
    
    if(data.Response === 'True') {
        /* fetching movie details from each title of the search results */
        for(let i = 0; i < data.Search.length; i++) {
            const movieTitles = data.Search[i].Title;
            const response2 = await fetch(`http://www.omdbapi.com/?apikey=f115e7ce&t=${movieTitles}`, {method:"GET"});
            const data2 = await response2.json();
            moviesObjArray.push(data2);
        }
        renderMovies();
    }
    else {
        renderMovieNotFoundMessage();
    }
}

function renderMovies() {
    let html = ``;
    moviesObjArray.forEach((movie) => {
        html += `
        <article class="movie--inner">
            <img src="${movie.Poster}" class="movie-poster">
                <div class="details--title">
                    <h2 class="text-primary fw-medium fs-secondary-heading">${movie.Title}</h2>
                    <span class="text-details">${movie.Year}</span>
                    <div class="details--rating">
                        <i class="fa-solid fa-star" style="color: #fec654;"></i>
                        <span class="text-primary fs-details">${movie.imdbRating}</span>
                    </div>
                </div>
                <div class="details--info">
                    <div class="info">
                        <p class="text-details fs-details">${movie.Runtime} | ${movie.Genre}</p>
                        <button type="button" class="watchlist-btn fs-details text-details">
                            <img src="/assets/images/add-icon.svg" alt="Add to watchlist plus icon">
                            Watchlist
                        </button>
                    </div>
                    <div class="info--summary">
                        <p class="text-secondary">${movie.Plot}</p>
                    </div>
                </div>
            </div>
        </article>
        `
    })
    document.getElementById("movie-container").innerHTML = html;
}

function renderMovieNotFoundMessage() {
    document.querySelector('.container--start-exploring').innerHTML = `
    <h2 class="text-light-grey fw-bold fs-secondary-heading">
        Unable to find what you’re looking for. Please try another search.
    </h2>
    `
}