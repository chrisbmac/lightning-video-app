import { Lightning } from '@lightningjs/sdk'
import HeroItem from './HeroItem'

export default class Hero extends Lightning.Component {
  static _template() {
    return {
      flex: {
        direction: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
      },
      Items: {
        y: 150,
        x: -1200,
        wrap: true,
        flex: {
          direction: 'column',
          wrap: true,
        },
      },
    }
  }
  get item() {
    return this.tag('Items')
  }

  _getFocused() {
    return this.tag('Items').children[this._index]
  }

  _init() {
    // current focused menu index
    this._index = 1
  }

  _handleLeft() {
    if (this._index === 0) {
      this.item.setSmooth('x', this.item.x - 2400)
      return (this._index = 2)
    }
    this._index--
    this.item.setSmooth('x', this.item.x + 1200)
  }

  _handleRight() {
    if (this._index === 2) {
      this.item.setSmooth('x', this.item.x + 2400)
      return (this._index = 0)
    }
    this._index++
    this.item.setSmooth('x', this.item.x - 1200)
  }
  set heroes(v) {
    this.tag('Items').children = v.map(el => {
      let color = '0xFFf2b255'
      return {
        type: HeroItem,
        action: el.id,
        color: color,
        label: el.title,
        backdrop: el.backdrop_path,
        poster: el.poster_path,
        overview: el.overview,
      }
    })
  }
}
