const watchlistFromLocalStorageArray = JSON.parse(localStorage.getItem('watchlist')) || [];
const watchlistContainerEl = document.getElementById('watchlist-container');

watchlistContainerEl.addEventListener('click', (e) => {
    if (e.target.dataset.watchlistBtnId) {
        handleRemoveFromWatchlistBtnClick(e.target.dataset.watchlistBtnId);
    }
})

function renderWatchlist() {
    if (watchlistFromLocalStorageArray.length > 0) {
        let html = ``;
        watchlistFromLocalStorageArray.forEach( (movie) => {
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
                                <img src="/assets/images/remove-icon.svg" alt="Remove from watchlist icon">
                                Remove
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
        document.getElementById('watchlist-container').innerHTML = html;
    }
    else {
        document.getElementById('watchlist-container').innerHTML = `
        <div class="container--start-exploring">
            <h2 class="text-light-grey fw-bold fs-secondary-heading">
                Your watchlist is looking a little empty...
            </h2>
            <a href="/index.html" class="fw-extra-bold">
                <img src="/assets/images/add-icon.svg" alt="Add to watchlist plus icon">
                Let’s add some movies!
            </a>
        </div>
        `
    }
}

function handleRemoveFromWatchlistBtnClick(id) {
    const index = watchlistFromLocalStorageArray.findIndex( (item) => item.imdbID === id);
    if (index !== -1) {
        watchlistFromLocalStorageArray.splice(index, 1);
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlistFromLocalStorageArray));
    renderWatchlist();  
}

renderWatchlist();
