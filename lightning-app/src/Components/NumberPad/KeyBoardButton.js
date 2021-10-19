import { Lightning } from '@lightningjs/sdk'

export default class NumberKeyBoard extends Lightning.Component {
  static _template() {
    return {
      x: 45,
      keys: [],
    }
  }
  _focus() {
    this.color = 0xff5395fc
  }
  _unfocus() {
    this.color = 0xff000000
  }
}
