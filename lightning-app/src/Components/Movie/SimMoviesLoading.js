import { Lightning } from '@lightningjs/sdk'

export default class SimMoviesLoading extends Lightning.Component {
  static _template() {
    return {
      Tile: {
        w: 200,
        h: 200,
        rect: true,
        color: 0xff000000,
      },
    }
  }

  _active() {
    this._loadingAnimation = this.tag('Tile').animation({
      duration: 2,
      repeat: 0,
      stopMethod: 'fade',
      actions: [
        {
          p: 'rotation',
          v: { 0: 0, 1: 6.29 },
        },
        {
          p: 'w',
          v: { 0: 200, 1: 150 },
        },
        { p: 'h', v: { 0: 200, 1: 150 } },
        { p: 'x', v: { 0: 0, 1: 0 } },
        { p: 'colorUl', v: { 0: 0xff2251e0, 1: 0xff000000 } },
        { p: 'colorBr', v: { 0: 0xff000000, 1: 0xff2251e0 } },
        { p: 'visible', v: { 0: true, 1: false } },
      ],
    })
    this._loadingAnimation.start()
  }
}
