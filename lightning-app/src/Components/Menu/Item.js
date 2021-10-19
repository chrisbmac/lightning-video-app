import { Lightning } from '@lightningjs/sdk'
import { getMoviePoster } from '../../Helpers/Helpers'
import { Yellow } from '../../Helpers/AppColors'

export default class Item extends Lightning.Component {
  static _template() {
    return {
      w: 250,
      h: 300,
      flex: { direction: 'column', justifyContent: 'space-between' },
      Image: {
        texture: '',
      },
      Border: {
        zIndex: -1,
        rect: true,
        visible: false,
        w: 220,
        h: 320,
        x: -7,
        y: -5,
        color: Yellow,
      },
    }
  }
  get border() {
    return this.tag('Border')
  }

  // will be automatically called
  set poster(v) {
    getMoviePoster(v, this.tag('Image'))
  }

  // will be automatically called
  set action(v) {
    this._action = v
  }

  // will be automatically called
  get action() {
    return this._action
  }

  _focus() {
    this.setSmooth('scaleX', 1.25)
    this.setSmooth('scaleY', 1.25)
    this.border.visible = true
  }

  _unfocus() {
    this.setSmooth('scaleX', 1)
    this.setSmooth('scaleY', 1)
    this.border.visible = false
  }
}
