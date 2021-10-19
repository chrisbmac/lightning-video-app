import { Lightning } from '@lightningjs/sdk'
import { Yellow } from '../Helpers/AppColors'
import FocusUnderLine from './Login/FocusUnderLine'

export default class Input extends Lightning.Component {
  static _template() {
    return {
      flex: { direction: 'column' },
      flexItem: { marginTop: 50 },
      text: { text: '', textColor: 0xffb0b0b0, fontSize: 20 },
      Input: {
        Label: {
          text: { text: '', textColor: 0xffb0b0b0, fontSize: 20 },
          InputUnderLine: {
            y: -35,
            type: FocusUnderLine,
          },
        },
        flexItem: { marginTop: 30 },
        texture: Lightning.Tools.getRoundRect(200, 30, 0, 1, Yellow, true, 0xffffffff),
        Cursor: { text: { text: '|', fontSize: 25, fontColor: 0xff000000 } },
      },
    }
  }
  get underLine() {
    return this.tag('Label')
      .tag('InputUnderLine')
      .tag('UnderLine')
  }
  _init() {
    this.text = this.i
  }
  _focus() {
    this.underLine.visible = true
  }
  _unfocus() {
    this.underLine.visible = false
  }
  _handleEnter() {
    this.fireAncestors('$setStateKeyBoard', this.tag('Input').tag('Label'))
  }
}
