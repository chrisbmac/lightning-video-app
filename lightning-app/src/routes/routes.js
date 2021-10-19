import NotFound from '../pages/NotFound.js'
import ErrorPage from '../pages/ErrorPage.js'
import Splash from '../Components/Splash.js'
import Main from '../pages/Main.js'
import Movie from '../pages/Movie'
import Player from '../pages/Player.js'
import Login from '../pages/Login.js'
import Search from '../pages/Search.js'
import Account from '../pages/Account.js'

import {
  getMovie,
  getMovieBackDrop,
  getMoviePagePoster,
  getRandomMovies,
  getSimilarMovies,
  getMovieCredits,
} from '../Helpers/Helpers.js'

export default {
  root: 'login',
  routes: [
    {
      path: 'login',
      component: Login,
    },
    {
      path: 'movie/:movieId',
      component: Movie,
      on: async (page, { movieId }) => {
        page.movieId = movieId
        page.movie = await getMovie(movieId)
        page.poster = await getMoviePagePoster(page.movie.poster_path)
        page.backDrop = await getMovieBackDrop(page.movie.backdrop_path)
        page.similar = await getSimilarMovies(movieId)
        page.credits = await getMovieCredits(movieId)
        return 'login'
      },
      cache: 60,
    },
    {
      path: 'main',
      component: Main,
      before: async page => {
        const randMovies = await getRandomMovies(20, null)
        page.randMovies = randMovies
        return page
      },
      cache: 60,
    },
    {
      path: 'player/:movieId',
      component: Player,
      on: async (page, { movieId }) => {
        page.similar = await getSimilarMovies(movieId)
      },
    },
    {
      path: 'search',
      component: Search,
    },
    {
      path: 'account',
      component: Account,
    },
    {
      path: '*',
      component: NotFound,
    },
    {
      path: '!',
      component: ErrorPage,
    },
    {
      path: 'splash',
      component: Splash,
    },
  ],
}
