import { Lightning, Img, Utils, Router } from '@lightningjs/sdk'
import Menu from '../Components/Menu/Menu.js'
import { getPopularMovies } from '../Helpers/Helpers.js'
import Logo from '../Components/Logo/logo'
import { TOM_CRUISE_SCI_FI, WILL_FERREL_COMEDY, LIAM_NEESON_R_RATED } from '../Helpers/Constants.js'
import HeroCarousel from '../Components/Hero/HeroCarousel.js'
import { HeroList } from '../Helpers/HeroList'
import Panel from '../Components/OptionsPanel/Panel.js'
export default class Main extends Lightning.Component {
  static _template() {
    // add movies bucket to Menu Component
    return {
      BGImage: {
        rect: true,
        w: 1920,
        h: 1080,
        zIndex: -10,
        texture: Img(Utils.asset('/images/background.png')).original(),
      },
      Logo: {
        y: 20,
        x: 50,
        type: Logo,
      },
      Panel: { type: Panel, zIndex: 10 },
      Lists: {
        HeroCarousel: {
          x: 1,
          y: 1,
          type: HeroCarousel,
          heroes: [],
        },
        Menu: {
          x: 150,
          y: 1000,
          type: Menu,
          title: 'Staff Picks',
          movies: [],
        },
        Menu2: {
          x: 150,
          y: 1525,
          type: Menu,
          title: 'Now In Cinemas!',
          movies: [],
        },
        Menu3: {
          x: 150,
          y: 2050,
          type: Menu,
          title: 'Will Ferrell Gut Busters',
          movies: [],
        },
        Menu4: {
          x: 150,
          y: 2550,
          type: Menu,
          title: 'Tom Cruise Weird Science',
          movies: [],
        },
        Menu5: {
          x: 150,
          y: 3075,
          type: Menu,
          title: "Liam Neeson's Particular Set of Thrills!",
          movies: [],
        },
      },
    }
  }
  pageTransition() {
    return 'crossfade'
  }
  _init() {
    this._index = 0
    this._setState('Main')
    // TODO! - Investigate if we can do this in one request
    // on init, pull down 7 random movies from randomMovie API
    this.tag('HeroCarousel').heroes = HeroList
    getPopularMovies(this.tag('Menu2'))
    getPopularMovies(this.tag('Menu3'), WILL_FERREL_COMEDY)
    getPopularMovies(this.tag('Menu4'), TOM_CRUISE_SCI_FI)
    getPopularMovies(this.tag('Menu5'), LIAM_NEESON_R_RATED)
  }

  _setIndex(idx) {
    // since it's a one time transition we use smooth

    // store new index
    this._index = idx
  }

  // random movies provided from router
  _onDataProvided() {
    this.tag('Menu').patch({ movies: this.randMovies })
  }

  _handleEnter() {
    if (this._index === 0) {
      this.signal('select', { item: this.tag('Hero').activeItem })
    }
  }

  _handleDown() {
    const y = this.tag('Lists').__core._y
    const lists = this.tag('Lists').children
    if (this._index === 0) {
      this.tag('Lists').setSmooth('y', 0 * -1600)
    }
    if (this._index === lists.length - 1) {
      return
    }
    this._setIndex(Math.min(++this._index, this.tag('Lists').__childList._items.length - 1))

    if (this._index === lists.length) {
      this.tag('Lists').setSmooth('y', (lists.length - 1) * -415)
    } else {
      this.tag('Logo').setSmooth('y', -200, { duration: 0.1 })
      this.tag('Lists').setSmooth('y', this._index * -515)
    }
  }

  _handleUp() {
    this._setIndex(Math.max(0, --this._index))
    let y = this.tag('Lists').__core._y
    if (this._index === 0) {
      this.tag('Lists').setSmooth('y', 1)
      this.tag('Logo').setSmooth('y', 20, { duration: 1 })
    } else {
      this.tag('Lists').setSmooth('y', y + 415)
    }
  }

  $navigate(movie) {
    Router.navigate(`movie/${movie}`)
  }

  $setStatePanel() {
    this._setState('Options')
  }

  static _states() {
    return [
      class Main extends this {
        _getFocused() {
          return this.tag('Lists').children[this._index]
        }
      },
      class Options extends Panel {
        _getFocused() {
          return this.tag('Panel')
        }
        _handleRight() {
          this._setState('Main')
        }
      },
    ]
  }
}
