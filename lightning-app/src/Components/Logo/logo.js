import { Lightning, Img, Utils } from '@lightningjs/sdk'

export default class Logo extends Lightning.Component {
  static _template() {
    return {
      flex: { direction: 'row', justifyContent: 'center', alignItems: 'center' },
      Image: {
        texture: Img(Utils.asset('/images/ticket-logo.png')).exact(100, 75),
      },
      BrandText: {
        w: 210,
        margin: 5,
        textAlign: 'center',
        maxLines: 2,
        text: {
          text: 'BLOCKBUSTERLY',
          fontFace: 'concertOne',
          fontSize: 28,
          textColor: '0xFFFFFFFF',
          textAlign: 'center',
        },
      },
    }
  }

  _getFocused() {
    return this.tag('MovieActions')
  }
  _init() {
    this.index = 0
  }
}
