/*eslint-disable*/
import {
  MOVIEDB_API_KEY,
  MOVIEDB_API_URL,
  MOVIEDB_POSTER_API,
  MOVIEDSB_ADVANCED_API,
  MOVIEDB_MOST_POPULAR,
  MOVIEDB_AUTH_TOKEN_TEMP,
  MOVIEDB_AUTH_GUEST_SESSION,
  MOVIEDB_AUTHENTICATE,
  SEARCH_MOVIE_DB
} from './Constants'
import { Img } from '@lightningjs/sdk'

export async function searchMovies(query) {
  fetch(`${SEARCH_MOVIE_DB}&${query}`)
  .then(res => console.log(res))
  .catch(err => console.log(err))
}

// fetch moviedb api and get details for a movie using a randomized ID.
export async function getRandomMovies(requestAmount, el) {
  try {
    let movies = []
    let movieObj = {}
    const limit = requestAmount || 20
    for (let i = 0; i < limit; i++) {
      // randomize video ID
      let movie = getRandomMovieId(1, 900)
      // randomize video color
      //let color = getRandomColor()
      movieObj = await (await fetch(`${MOVIEDB_API_URL}${movie}${MOVIEDB_API_KEY}`)).json()
      if(!movieObj.status_code && movieObj.status_code !== 34) movies.push(movieObj)
    }
    return movies
  } catch(err) {
    console.log('Error fetching random movies: ', err)
  }
}

// fetch most popular movies.
export function getPopularMovies(tag, customUrl) {
  const collection = customUrl ? customUrl : MOVIEDB_MOST_POPULAR;
  const {url, row} = collection
  let movies = []

  fetch(`${MOVIEDSB_ADVANCED_API}${MOVIEDB_API_KEY}${url}`)
    .then((response) => {
      // TODO! - rough code used, Investigate if its possible to pull random lists via api params
      // Examine the text in the response, filter out results that error
      response.json().then(data => {
          if (data.status_code && 34 === data.status_code) {
            return
          } else {
            tag.patch({
              title: row,
              movies: [...data.results]
            })
          }
      })
    })
    .then(() => { tag.patch({ movies: movies })})
    .catch(err => console.log('Fetch Error :-S', err))
}

// get movie by ID
export async function getMovie(id) {
  if(!id) throw Error('No ID provided!')
  return fetch(`${MOVIEDB_API_URL}${id}${MOVIEDB_API_KEY}`)
    .then(res => res.json())
    .catch(err => console.log('Error fetching movie: ', err))
}

// basic film ID randomizer
const getRandomMovieId = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

// generate random color to use as background
export const getRandomColor = () => {
  const randomHex = `0xFF${Math.floor(Math.random() * 16777215).toString(16)}`
  return randomHex
}

export const getMoviePoster = (url, tag, backDrop = null) => {
  // get movie poster using url from movie object, returns img address
  // example URL
  // https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg

  const height = backDrop ? 700 : 309
  const width = backDrop ? 1200 : 206

  fetch(`${MOVIEDB_POSTER_API}${url}`)
    .then(resp => {
      tag.patch({
        Content: {
          Image: { texture: Img(resp.url).exact(width, height)
        },
        }
      })
    })
    .catch(err => console.log('Fetch Error :-S', err))
}

// get movie page poster
export const getMoviePagePoster = async (url) => {
  if(!url) throw Error('No URL Provided')
  try {
    const poster = await fetch(`${MOVIEDB_POSTER_API}${url}`)
    return poster.url
  } catch(err) {
    console.log('Error fetching movie page poster: ', err)
  }
}

// get movie back drop image
export const getMovieBackDrop = async (url) => {
  if(!url) throw Error('No URL Provided')
  try {
    const posterBD = await fetch(`${MOVIEDB_POSTER_API}${url}`)
    return posterBD.url
  } catch(err) {
    console.log('Error fetching movie back drop: ', err)
  }
}

export const convertToInfinite = (tag, original) => {
  // converts list of films to a list suitable for infinite scrolling
  const length = original.length
  const first = original[0]
  const last = original[length-1]
  const newArr = [
    last,
    ...original,
    first
  ]

  tag.patch({
      heroes: [...newArr]
  })
}
// get similar movies, pass in id
export const getSimilarMovies = async (id) => {
  if(!id) throw Error('No Id provided')
  try {
    const movies = await(await fetch(`${MOVIEDB_API_URL}${id}/similar${MOVIEDB_API_KEY}`)).json()
    return movies.results
  } catch(err) {
    console.log('Error getting similar movies: ', err)
  }
}

//TODO - provide status if posted to user
//post movie rating
export const postMovieRating = async (id, rate) => {
  if(!rate || !id) throw Error('No rating provided or id')
  const body = JSON.stringify({"value": parseInt(rate)})
  try {
    const rating = await(await fetch(`${MOVIEDB_API_URL}${id}/rating${MOVIEDB_API_KEY}&guest_session_id=${localStorage.getItem("guestSession")}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: body
    })).json()
  } catch(err) {
    console.log('Error submitting movie rating: ', err)
  }
}

// create guest session
export const createGuestSession = async () => {
  try {
    const guestSession = await(await fetch(MOVIEDB_AUTH_GUEST_SESSION)).json()
    if(guestSession.success) return localStorage.setItem("guestSession", guestSession.guest_session_id)
  } catch(err) {
    console.log('Error guest sessions: ', err)
  }
}

// autheticate user - create session
export const createSessionToken = async () => {
  try {
    // set temp token in local storage for now - not to serious
    const tempToken = await(await fetch(MOVIEDB_AUTH_TOKEN_TEMP)).json()
    if(tempToken.success) {
      localStorage.setItem("tempToken", tempToken.request_token)
      const URL = MOVIEDB_AUTHENTICATE + tempToken.request_token
      window.location.replace(URL)
    }

  }catch(err) {
    console.log('Error creating session tokens: ', err)
  }
}

export const getMovieCredits = async (id) => {
  if(!id) throw Error('No ID provided for credits')
  try {   
    return await(await fetch(`${MOVIEDB_API_URL}${id}/credits${MOVIEDB_API_KEY}`)).json()
  } catch(err) {
    console.log('Error fetching credits: ', err)
  }
}

export const getActorProfileImage = async (path) => {
  //if(!path) return //throw Error('No path provided for actor image')
  try {
    if (!path) return '../../static/images/background.png'
    const img = await fetch(`${MOVIEDB_POSTER_API}/${path}${MOVIEDB_API_KEY}`)
    return img.url
  } catch(err) {
    console.log('Error getting actor profile image: ', err)
  }
}
