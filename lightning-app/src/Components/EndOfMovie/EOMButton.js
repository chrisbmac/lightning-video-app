import { Lightning } from '@lightningjs/sdk'

export default class EOMButton extends Lightning.Component {
  static _template() {
    return {
      w: 50,
      h: 50,
      flexItem: { marginRight: 50 },
      BG: {
        zIndex: 1,
        w: 60,
        h: 70,
        texture: Lightning.Tools.getRoundRect(50, 50, 4),
        colorTop: 0xff636efb,
        colorBottom: 0xff1c27bc,
      },
      Icon: {
        y: 10,
        x: 4.5,
        zIndex: 2,
        w: 50,
        h: 50,
        texture: '',
      },
      UnderLine: {
        visible: false,
        y: 72,
        x: 2.2,
        rect: true,
        w: 59,
        h: 5,
        color: 0xff000000,
      },
    }
  }
  _focus() {
    this.tag('BG').color = 0xff525df7
    this.tag('UnderLine').visible = true
  }
  _unfocus() {
    this.tag('BG').colorTop = 0xff636efb
    this.tag('BG').colorBottom = 0xff1c27bc
    this.tag('UnderLine').visible = false
  }
}
