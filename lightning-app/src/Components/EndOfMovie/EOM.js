import { Lightning } from '@lightningjs/sdk'
import EOMControls from './EOMControls'
import EOMRow from './EOMRow'
export default class EOM extends Lightning.Component {
  static _template() {
    return {
      Main: {
        w: 1920,
        h: 1080,
        rect: true,
        color: 0xff000000,
        alpha: 0.6,
        Text: { x: 500, y: 500, text: { text: '' } },
      },
      TopBG: {
        rect: true,
        w: 1920,
        h: 100,
        color: 0xff000000,
        alpha: 0.9,
      },
      MovieTitle: {
        x: 50,
        y: 35,
        text: { text: '', fonSize: 35, textColor: 0xffd9d9d9, fontStyle: 'bold' },
      },
      EOMControls: {
        type: EOMControls,
      },
      EOMRow: {
        type: EOMRow,
      },
      BottomBg: {
        rect: true,
        w: window.innerWidth,
        h: 100,
        color: 0xff000000,
        alpha: 0.9,
        y: 980,
      },
      movieTitle: '',
    }
  }

  set movieTitle(title) {
    if (title) return (this.tag('MovieTitle').text._text = `Just Watched: ${title}`)
  }

  _init() {
    this._setState('Controls')
  }

  static _states() {
    return [
      class Controls extends EOMControls {
        _handleDown() {
          this._setState('Row')
        }
        _getFocused() {
          return this.tag('EOMControls')
        }
      },
      class Row extends EOMRow {
        _handleUp() {
          this._setState('Controls')
        }
        _getFocused() {
          return this.tag('EOMRow')
        }
      },
    ]
  }
}
