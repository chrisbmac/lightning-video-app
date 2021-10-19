import { Lightning } from '@lightningjs/sdk'
export default class MovieButton extends Lightning.Component {
  static _template() {
    return {
      colorTop: 0xff636efb,
      colorBottom: 0xff1c27bc,
    }
  }
  _focus() {
    this.color = 0xff525df7
  }
  _unfocus() {
    this.colorTop = 0xff636efb
    this.colorBottom = 0xff1c27bc
  }
}
