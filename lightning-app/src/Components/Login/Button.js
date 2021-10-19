import { Lightning } from '@lightningjs/sdk'
import FocusUnderLine from './FocusUnderLine.js'

export default class Button extends Lightning.Component {
  static _template() {
    return {
      alpha: 0.5,
      w: 100,
      h: 30,
      flexItem: { marginRight: 60 },
      BtnUnderLine: {
        type: FocusUnderLine,
      },
    }
  }
  get underLine() {
    return this.tag('BtnUnderLine').tag('UnderLine')
  }
  _focus() {
    this.alpha = 1
  }
  _unfocus() {
    this.alpha = 0.5
  }
}
