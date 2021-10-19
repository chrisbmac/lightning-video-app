import { Lightning, Router, Img, Utils } from '@lightningjs/sdk'

import MovieBody from '../Components/Movie/MovieBody.js'
import TopNavBar from '../Components/TopNavBar.js'
import MovieCastRow from '../Components/Movie/MovieCastRow.js'
export default class Movie extends Lightning.Component {
  static _template() {
    return {
      Page: {
        rect: true,
        w: 1920,
        h: 1080,
        texture: Img(Utils.asset('/images/background.png')).cover(1080, 1920),
        alpha: 0.9,
      },
      BGImage: {
        rect: true,
        w: 1920,
        h: 1080,
        zIndex: -10,
        texture: '',
      },
      Header: {
        type: TopNavBar,
      },
      Body: {
        type: MovieBody,
        signals: {
          toggleText: true,
        },
      },
      MovieCastRow: {
        type: MovieCastRow,
      },
    }
  }

  $getTitle() {
    return this.movie.title
  }

  pageTransition() {
    return 'crossfade'
  }

  _getFocused() {
    return this.tag('Body')
  }

  $navigate(path) {
    if (path === '#player')
      return Router.navigate(`${path}/${this.movieId}`, {
        movieTitle: this.movie.title,
        from: this,
      })
    Router.navigate(path)
  }

  // pass data to children
  _onDataProvided() {
    this.tag('Body').children[0].tag('Description').text = this.movie.overview

    this.tag('Body').children[1].tag('MovieTitle').text = this.movie.title
    this.tag('Body').children[1].tag(
      'MovieRating'
    ).text = `${this.movie.vote_average.toString()}/10`
    this.tag('Body').children[1].tag('ReleaseDate').text = this.movie.release_date
    this.tag('Body').children[1].tag(
      'MovieLength'
    ).text = `${this.movie.runtime.toString()} minutes`

    this.tag('Body').children[2].tag('Image').texture = Img(this.poster).exact(300, 500)

    this.tag('Body')
      .children[4].tag('MovieStudios')
      .patch({ studios: this.movie.production_companies })

    this.tag('Body')
      .children[4].tag('MovieLanguages')
      .patch({ languages: this.movie.spoken_languages })

    this.tag('Body')
      .children[4].tag('MovieGenres')
      .patch({ genres: this.movie.genres })

    this.tag('BGImage').texture = Img(this.backDrop).original()

    this.tag('Body')
      .children[3].tag('SimilarMovies')
      .patch({ id: this.movieId })
    this.tag('Body').children[3].tag('PostRating').postMovieId = this.movieId
    this.tag('MovieCastRow').cast = this.credits
  }
}
