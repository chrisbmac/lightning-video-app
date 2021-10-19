import { Lightning } from '@lightningjs/sdk'

export default class SideBarIcon extends Lightning.Component {
  static _template() {
    return {
      w: 68,
      h: 68,
      zIndex: 3,
      Image: {
        texture: '',
        zIndex: 2,
        x: 10,
        y: 2,
      },
      BG: {
        x: 4,
        alpha: 0.5,
        zIndex: -1,
        rect: true,
        h: 65,
        w: 68,
        color: 0xffffffff,
        visible: false,
      },
    }
  }
  _focus() {
    this.tag('BG').visible = true
  }
  _unfocus() {
    this.tag('BG').visible = false
  }
  // _handleEnter() {
  //   console.log('Enter', this.typeOfButton)
  // }
}
