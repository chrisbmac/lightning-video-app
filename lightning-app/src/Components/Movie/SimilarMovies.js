import { Lightning, Router, Img, Utils } from '@lightningjs/sdk'
import { getSimilarMovies, getMoviePagePoster, getMovieBackDrop } from '../../Helpers/Helpers.js'
import MovieButton from './MovieButton.js'
import SimilarMoviesTile from './SimilarMoviesTile.js'
import SimMoviesDescription from './SimMoviesDescription.js'
export default class SimilarMovies extends Lightning.Component {
  static _template() {
    return {
      loading: true,
      id: null,
      OverLay: {
        zIndex: 5,
        visible: true,
        x: -100,
        y: 0,
        w: 1920,
        h: 1080,
        rect: true,
        alpha: 0.9,
        color: 0xff000000,
      },
      ColTitle: {
        zIndex: 6,
        x: 0,
        y: 20,
        color: 0xffd9d9d9,
        text: { text: 'Find Similar Movies', fontSize: 25 },
      },
      Column: {
        zIndex: 7,
        x: 0,
        y: 50,
        w: 950,
        movies: [],
        color: 0xffffffff,
        flex: {
          direction: 'row',
          wrap: true,
        },
      },
      BackBtn: {
        type: MovieButton,
        zIndex: 7,
        x: -85,
        y: 70,
        texture: Lightning.Tools.getRoundRect(50, 50, 4),
        BackLabel: {
          y: 12,
          x: 35,
        },
        BackImage: {
          zIndex: 2,
          x: 13,
          y: 15,
          texture: Img(Utils.asset('/svgs_icons/outline_arrow_back_black_24dp.png')).original(),
        },
      },
      Description: {
        type: SimMoviesDescription,
      },
    }
  }
  $fireDescriptionAnimation() {
    const desAnimation = this.description.animation({
      duration: 0.5, //duration of 1 second
      repeat: 0, //Plays only once
      stopMethod: 'immediate', //Stops the animation immediately
      actions: [{ p: 'alpha', v: { 0: 0, 1: 1 } }],
    })
    desAnimation.start()
  }
  get description() {
    return this.tag('Description')
  }
  get column() {
    return this.tag('Column')
  }
  _focus() {
    const simAnimation = this.tag('OverLay').animation({
      duration: 0.5, //duration of 1 second
      repeat: 0, //Plays only once
      stopMethod: 'immediate', //Stops the animation immediately
      actions: [{ p: 'alpha', v: { 0: 0, 1: 1 } }],
    })
    simAnimation.start()
    const mainAnimation = this.animation({
      duration: 0.5, //duration of 1 second
      repeat: 0, //Plays only once
      stopMethod: 'immediate', //Stops the animation immediately
      actions: [{ p: 'alpha', v: { 0: 0, 1: 1 } }],
    })
    mainAnimation.start()
    simAnimation.start()

    this.tag('OverLay').visible = true
  }
  _unfocus() {
    this.tag('OverLay').visible = false
  }
  _handleEnter() {
    this.fireAncestors('$similarMoviesVisible')
    Router.navigate(`movie/${this.tag('Column').children[this.index].simId}`)
  }
  // Similar movies only returns 20, so we can set hard values for scrolling/focusing
  _handleUp() {
    if (this.index >= 0 && this.index <= 4) return (this.index += 15)
    this.index -= 5
  }
  _handleDown() {
    if (this.index <= this.movies.length - 1 && this.index >= this.movies.length - 5)
      return (this.index -= 15)
    this.index += 5
  }
  _handleRight() {
    if (this.index === this.column.children.length - 1) return (this.index = 0)
    this.index++
  }
  _handleLeft() {
    if (this.index === 0 || (this.index % 5 === 0 && this.index != 20))
      return this._setState('LeaveGrid')
    this.index--
  }
  _getFocused() {
    return this.tag('Column').children[this.index]
  }
  _active() {
    this.index = 0
    if (this._id) this.$fetchMovies()
  }
  set id(id) {
    return (this._id = id)
  }

  // set description values
  movieOverView() {
    this.description.tag('Text').text = this.movies[this.index].overview
  }
  movieTitle() {
    this.description.tag('Title').tag('TitleText').text = this.movies[this.index].title
  }
  async movieBackDrop() {
    this.description.tag('BackDrop').tag('Image').texture = Img(
      await getMovieBackDrop(this.movies[this.index].backdrop_path)
    ).exact(850, 850)
  }

  async $fetchMovies() {
    const movies = await getSimilarMovies(this._id)
    this.movies = movies
    this.moviesLength = movies.length
    await this.$fetchPoster(movies)
  }

  async $fetchPoster(movies) {
    return (this.tag('Column').children = await Promise.all(
      movies.map(async elem => {
        return {
          zIndex: 3,
          type: SimilarMoviesTile,
          flexItem: { marginTop: 10, marginRight: 10 },
          Image: {
            zIndex: 8,
            texture: Img(await getMoviePagePoster(elem.poster_path)).exact(200, 200),
          },
          simId: elem.id,
          signals: {
            movieOverView: true,
            movieBackDrop: true,
            movieTitle: true,
          },
        }
      })
    ))
  }
  static _states() {
    return [
      class LeaveGrid extends MovieButton {
        _handleRight() {
          this._setState('Grid')
        }
        _getFocused() {
          return this.tag('BackBtn')
        }
        _handleEnter() {
          this.fireAncestors('$similarMoviesVisible')
        }
      },
      class Grid extends this {},
    ]
  }
}
