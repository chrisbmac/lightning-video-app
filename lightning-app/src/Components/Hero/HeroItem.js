import { Lightning, Img } from '@lightningjs/sdk'
import { getMoviePoster } from '../../Helpers/Helpers'

export default class HeroItem extends Lightning.Component {
  static _template() {
    return {
      flexItem: { marginLeft: 100, marginRight: 100 },
      rect: true,
      w: 1200,
      h: 700,
      Container: {
        rect: true,
        w: 1200,
        h: 700,
        color: '0xFF000000',
        alpha: 0.55,
        zIndex: 10,
      },
      Backdrop: {
        texture: '',
      },
      Poster: {
        alpha: 1,
        zIndex: 100,
        x: 200,
        y: 150,
        texture: '',
      },
      Title: {
        wrap: true,
        textAlign: 'center',
        y: 200,
        x: 500,
      },
      Break: {
        rect: true,
        h: 20,
        w: 600,
        x: 500,
        y: 250,
        color: '',
      },
      Overview: {
        x: 500,
        y: 290,
        wrap: true,
        textAlign: 'center',
      },
    }
  }

  _init() {
    this.tag('Break').patch({
      zIndex: 100,
      color: '0xFFf2b255',
    })
  }

  // will be automatically called
  set action(v) {
    this._action = v
  }

  // will be automatically called
  get action() {
    return this._action
  }

  // Markup
  set backdrop(v) {
    getMoviePoster(v, this.tag('Backdrop'), true)
  }

  set poster(v) {
    getMoviePoster(v, this.tag('Poster'), false)
  }

  set label(v) {
    this.tag('Title').patch({
      Title: {
        w: 600,
        wrap: true,
        textAlign: 'center',
        maxLines: 2,
        zIndex: 100,
        text: {
          text: v,
          fontFace: 'concertOne',
          fontSize: 36,
          textColor: '0xFFFFFFFF',
          textAlign: 'center',
        },
      },
    })
  }

  set color(v) {
    this.tag('Break').patch({
      Break: {
        alpha: 1,
        zIndex: 100,
        color: v,
      },
    })
  }

  set overview(v) {
    this.tag('Overview').patch({
      Overview: {
        w: 600,
        wrap: true,
        textAlign: 'center',
        maxLines: 8,
        zIndex: 100,
        text: {
          text: v,
          fontFace: 'Roboto',
          fontSize: 16,
          textColor: '0xFFFFFFFF',
          textAlign: 'center',
        },
      },
    })
  }

  // Focus Actions
  _focus() {
    this.setSmooth('scaleX', 1.15)
    this.setSmooth('scaleY', 1.15)
  }

  _unfocus() {
    this.setSmooth('scaleX', 1)
    this.setSmooth('scaleY', 1)
  }

  _handleEnter() {
    this.fireAncestors('$navigate', this.action)
  }
}
