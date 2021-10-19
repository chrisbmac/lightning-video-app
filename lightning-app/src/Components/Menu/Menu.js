import { Lightning } from '@lightningjs/sdk'
import Item from './Item.js'

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      // we define a empty holder for our movies of
      // position it 40px relative to the component position
      // so we have some space for our focus indicator
      RowTitle: {
        text: 'placeholder title',
      },
      Items: {
        x: 60,
        wrap: true,
        flex: {
          direction: 'column',
          wrap: true,
        },
        // rect: true
      },
      // Create a text component that indicates
      // which item has focus
      FocusIndicator: {
        y: 100,
        x: -50,
        visible: false,
        text: {
          text: '>',
          fontFace: 'pixel',
        },
      },
    }
  }

  _init() {
    // create a blinking animation
    this._blink = this.tag('FocusIndicator').animation({
      duration: 0.5,
      repeat: -1,
      actions: [{ p: 'x', v: { 0: 0, 0.5: -40, 1: 0 } }],
    })

    // start the animation
    this._blink.start()

    // current focused menu index
    this._index = 0
  }

  set movies(movies) {
    // map over each random movie and return an Item class
    this.tag('Items').children = movies.map(el => {
      return {
        type: Item,
        action: el.id,
        label: el.title,
        color: el.color,
        poster: el.poster_path,
        movie: el,
      }
    })
  }

  set title(v) {
    return this.tag('RowTitle').patch({
      RowTitle: {
        text: v,
        y: -80,
      },
    })
  }

  _getFocused() {
    return this.tag('Items').children[this._index]
  }

  _focus() {
    if (this._index === 0) {
      this.tag('FocusIndicator').patch({
        visible: true,
      })
    }
  }

  _unfocus() {
    this.tag('FocusIndicator').patch({
      visible: false,
    })
  }
  get movies() {
    return this.tag('Items').children
  }

  // Navigation
  get activeItem() {
    return this.movies[this._index]
  }

  _handleLeft() {
    if (this._index === 0) this.fireAncestors('$setStatePanel')
    let x = this.tag('Items').__core._x
    this._setIndex(Math.max(0, --this._index))
    if (this._index >= 4) {
      this.tag('Items').setSmooth('x', x + 160)
      this.tag('FocusIndicator').patch({
        visible: false,
      })
    } else {
      this.tag('Items').setSmooth('x', 60)
      this.tag('FocusIndicator').patch({
        visible: true,
      })
    }
  }

  _handleRight() {
    const x = this.tag('Items').__core._x
    const movies = this.tag('Items').children
    this._setIndex(Math.min(++this._index, this.movies.length - 1))
    if (this._index >= movies.length - 1) {
      return
    } else if (this._index >= 4 && this._index <= movies.length - 3) {
      this.tag('Items').setSmooth('x', x - 250)
      this.tag('FocusIndicator').patch({
        visible: false,
      })
    } else if (this._index >= this.movies.length) {
      return
    }
  }

  _handleEnter() {
    this.fireAncestors('$navigate', this.movies[this._index].action)
  }
  _setIndex(idx) {
    // store new index
    this._index = idx
  }
}
