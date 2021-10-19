// THEMOVIEDB API Url
export const MOVIEDB_API_URL = 'https://api.themoviedb.org/3/movie/'

// THEMOVIEDB API Key
export const MOVIEDB_API_KEY = '?api_key=9650c44de20620fb95f75851b8613e0d'

//TMDb API - Poster
export const MOVIEDB_POSTER_API = 'https://image.tmdb.org/t/p/w500'

//TMBd API - Advanced Pull
export const MOVIEDSB_ADVANCED_API = 'https://api.themoviedb.org/3/discover/movie/'

// create auth temp token
export const MOVIEDB_AUTH_TOKEN_TEMP = `https://api.themoviedb.org/3/authentication/token/new${MOVIEDB_API_KEY}`

// guest session
export const MOVIEDB_AUTH_GUEST_SESSION = `https://api.themoviedb.org/3/authentication/guest_session/new${MOVIEDB_API_KEY}`

//authenticate and create a session
export const MOVIEDB_AUTHENTICATE = 'https://www.themoviedb.org/authenticate/'

export const MOVIEDB_MOST_POPULAR = {
  collection: 'Most Popular',
  url: '&language=en-US&sort_by=popularity.desc&include_adult=false',
}

// TMDb API - 2010, Top Rated Films
export const MOVIEDB_MOST_POPULAR_2010 =
  '&language=en-US&sort_by=primary_release_year=2010&sort_by=vote_average.desc&include_adult=false'

// ADV API - Tom Cruise Sci Fi
export const TOM_CRUISE_SCI_FI = {
  collection: 'Tom Cruise Sci-Fi Epics',
  url: '&language=en-US?with_genres=878&with_cast=500&sort_by=vote_average.desc',
}

// ADV API - Will Ferrell Comedies
export const WILL_FERREL_COMEDY = {
  collection: 'Will Ferrell Gut Busters',
  url: '&language=en-US?with_genres=35&with_cast=23659&sort_by=revenue.desc',
}

// ADV API - Liam Neeson R-Rated
export const LIAM_NEESON_R_RATED = {
  collection: 'Liam Neeson Rated R',
  url:
    '&language=en-US?certification_country=US&certification=R&sort_by=revenue.desc&with_cast=3896',
}

export const API_URL = 'http://localhost:3000'

// search for a movie
export const SEARCH_MOVIE_DB = 'https://api.themoviedb.org/3/search/movie'
