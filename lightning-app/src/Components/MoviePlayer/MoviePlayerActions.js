import { Lightning } from '@lightningjs/sdk'

export default class MoviePlayerActions extends Lightning.Component {
  static _template() {
    return {
      Buttton: {
        w: 80,
        h: 80,
        UL: {
          alpha: 0.6,
          visible: false,
          rect: true,
          color: 0xff000000,
          w: 90,
          h: 5,
          y: 90,
        },
      },
    }
  }
  _focus() {
    this.patch({ w: 90, h: 90 })
    this.tag('UL').patch({ visible: true })
  }
  _unfocus() {
    this.patch({ w: 80, h: 80 })
    this.tag('UL').patch({ visible: false })
  }
}
