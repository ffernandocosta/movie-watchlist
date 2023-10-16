let moviesObjArray = [];
const watchlistObjArray = [];
const searchFormEl = document.getElementById('search-form');
const moviesContainerEl = document.getElementById('movie-container');

searchFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    getMovies();
})

moviesContainerEl.addEventListener('click', (e) => {
    if (e.target.dataset.watchlistBtnId) {
        handleAddToWatchlistBtnClick(e.target.dataset.watchlistBtnId);
    }
})

async function getMovies() {
    const searchInputValue = document.getElementById('search-input').value.trim();
    /* fetching movie titles search data */
    const response = await fetch(`http://www.omdbapi.com/?apikey=f115e7ce&s=${searchInputValue}`, {method:"GET"});
    const data = await response.json();
    
    if(data.Response === 'True') {
        /* emptying movie array before fetching new movies */
        moviesObjArray.length = 0;
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
                        <button type="button" data-watchlist-btn-id="${movie.imdbID}" class="watchlist-btn fs-details text-details">
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

function handleAddToWatchlistBtnClick(id) {
    const targetMovieObj = moviesObjArray.filter( (movie) => movie.imdbID === id)[0];
    if (watchlistObjArray.includes(targetMovieObj)) {
        watchlistObjArray.forEach( (item, index) => {
            if (targetMovieObj === item) {
                watchlistObjArray.splice(index, 1);
                document.querySelector(`[data-watchlist-btn-id="${targetMovieObj.imdbID}`).innerHTML = `
                    <img src="/assets/images/add-icon.svg" alt="Add to watchlist plus icon">
                    Watchlist
                `
            }
        })
    }
    else {
        watchlistObjArray.push(targetMovieObj);
        document.querySelector(`[data-watchlist-btn-id="${targetMovieObj.imdbID}`).innerHTML = `
            <img src="/assets/images/remove-icon.svg" alt="Remove from watchlist icon">
            Remove
        `
    }
}

function renderMovieNotFoundMessage() {
    document.querySelector('.container--start-exploring').innerHTML = `
    <h2 class="text-light-grey fw-bold fs-secondary-heading">
        Unable to find what you’re looking for. Please try another search.
    </h2>
    `
}