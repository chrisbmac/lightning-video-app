import { Lightning, Img, Utils } from '@lightningjs/sdk'
import MovieButton from './MovieButton'
import SimilarMovies from './SimilarMovies'
import PostRating from '../PostRating'
export default class MovieActions extends Lightning.Component {
  static _template() {
    const yAxis = 350
    return {
      Back: {
        type: MovieButton,
        x: -60,
        y: 120,
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
      Play: {
        x: 280,
        y: yAxis,
        type: MovieButton,
        texture: Lightning.Tools.getRoundRect(100, 50, 4),
        PlayLabel: {
          y: 11.5,
          x: 37,
          color: 0xffffffff,
          text: { text: 'Play', fontSize: 20 },
        },
        PlayImage: {
          x: 10,
          y: 12,
          texture: Img(
            Utils.asset('/svgs_icons/outline_play_circle_filled_black_24dp.png')
          ).original(),
        },
      },
      Favorite: {
        type: MovieButton,
        x: 390,
        y: yAxis,
        texture: Lightning.Tools.getRoundRect(50, 50, 4),
        FavoriteLabel: {
          y: 12,
          x: 35,
        },
        FavoriteImage: {
          x: 13,
          y: 15,
          texture: Img(Utils.asset('/svgs_icons/outline_favorite_black_24dp.png')).original(),
        },
      },
      ButtonPostRating: {
        type: MovieButton,
        x: 450,
        y: yAxis,
        texture: Lightning.Tools.getRoundRect(50, 50, 4),
        PostLabel: {
          y: 12,
          x: 35,
        },
        PostImage: {
          h: 35,
          w: 35,
          x: 8,
          y: 8,
          texture: Img(Utils.asset('/svgs_icons/icons8-rating-50.png')).original(),
        },
      },
      SimilarMoviesBtn: {
        type: MovieButton,
        x: 510,
        y: yAxis,
        texture: Lightning.Tools.getRoundRect(105, 50, 4),
        SimLabel: {
          y: 11.5,
          x: 40,
          color: 0xffffffff,
          text: { text: 'Similar', fontSize: 20 },
        },
        SimImage: {
          h: 35,
          w: 35,
          x: 8,
          y: 8,
          texture: Img(Utils.asset('/svgs_icons/icons8-similar-items-60.png')).original(),
        },
      },
      SimilarMovies: {
        visible: false,
        type: SimilarMovies,
        signals: {
          handleFocus: true,
        },
      },
      PostRating: {
        visible: false,
        type: PostRating,
      },
    }
  }

  handleFocus() {
    this.index = 3
  }
  _handleLeft() {
    if (this.index === 0) return
    this.index--
  }
  _handleRight() {
    if (this.index === 4) return
    this.index++
  }
  _handleUp() {
    this.index = 0
  }
  _handleDown() {
    this.index = 1
  }
  _handleEnter() {
    if (this.index === 0) {
      return this.fireAncestors('$navigate', '#main')
    } else if (this.index === 1) {
      return this.fireAncestors('$navigate', '#player')
    } else if (this.index === 3) {
      return this._setState('PostPanel')
    } else if (this.index === 4) {
      return this.similarMoviesVisible()
    }
  }
  similarMoviesVisible() {
    if (!this.similarMovies.visible) return this._setState('SimMovies')
    this.similarMovies.visible = !this.similarMovies.visible
    this._setState('MainActions')
  }
  _init() {
    this.index = 0
  }
  _getFocused() {
    return this.children[this.index]
  }

  closePostPanel() {
    this._setState('MainActions')
    return (this.index = 3)
  }

  get similarMovies() {
    return this.tag('SimilarMovies')
  }

  static _states() {
    return [
      class MainActions extends this {},
      class SimMovies extends SimilarMovies {
        $enter() {
          this.similarMovies.visible = true
        }
        $similarMoviesVisible() {
          this.similarMoviesVisible()
        }
        _getFocused() {
          return this.similarMovies
        }
      },
      class PostPanel extends PostRating {
        $enter() {
          this.tag('PostRating').visible = true
        }
        $exit() {
          this.tag('PostRating').visible = false
        }
        _getFocused() {
          return this.tag('PostRating')
        }
        $passClosePanel() {
          this.closePostPanel()
        }
      },
    ]
  }
}
