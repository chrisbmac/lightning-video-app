import { Lightning } from '@lightningjs/sdk'
import { Yellow } from '../../Helpers/AppColors'
import FocusUnderLine from '../Login/FocusUnderLine'
import FormValidation from './FormValidation'

export default class Input extends Lightning.Component {
  static _template() {
    return {
      flex: { direction: 'column' },
      flexItem: { marginTop: 65 },
      text: { text: '', textColor: 0xffb0b0b0, fontSize: 20 },
      Input: {
        Label: {
          text: {
            w: 300,
            flexItem: { marginLeft: 24, marginTop: 5 },
            text: '',
            textColor: 0xff000000,
            fontSize: 23,
            wordWrap: false,
          },
          InputUnderLine: {
            y: -35,
            type: FocusUnderLine,
          },
        },
        flexItem: { marginTop: 30 },
        texture: Lightning.Tools.getRoundRect(300, 30, 0, 1, Yellow, true, 0xffffffff),
        Cursor: { text: { text: '|', fontSize: 20, fontColor: 0xff000000 } },
      },
      Validation: { type: FormValidation },
      pass: null,
      inputType: null,
    }
  }
  get underLine() {
    return this.tag('Label')
      .tag('InputUnderLine')
      .tag('UnderLine')
  }
  get label() {
    return this.tag('Input').tag('Label')
  }
  get validation() {
    return this.tag('Validation')
  }
  _active() {
    this.pass = null
    this.label.patch({ text: { text: '' } })
  }
  _init() {
    this.text = this.i
    this.inputType = this.i
    this.tag('Validation').text = this.inputType
  }
  _focus() {
    this.underLine.visible = true
    if (!this.label.text._text) return
    if (this.validation.passCorrectValidator(this.i, this.label.text._text)) {
      this.pass = true
      this.validation.visible = false
    } else {
      this.pass = false
      this.validation.visible = true
    }
  }
  _unfocus() {
    this.underLine.visible = false
  }
  _handleEnter() {
    this.fireAncestors('$setStateKeyBoard', this.tag('Input').tag('Label'))
  }
}
