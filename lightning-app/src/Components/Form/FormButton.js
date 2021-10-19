import { Lightning } from '@lightningjs/sdk'
import { Yellow, InvalidRed } from '../../Helpers/AppColors'

export default class FormButton extends Lightning.Component {
  static _template() {
    return {
      alpha: 0.5,
      w: 100,
      h: 30,
      flexItem: { marginTop: 65 },
      Text: { text: { text: '', fontSize: 25, textColor: 0xffffffff, zIndex: 6, x: 0 } },
      canSubmit: false,
    }
  }
  _setup() {
    this.tag('Text').patch({ text: { text: this.textValue } })
  }

  set setText(value) {
    this.tag('Text').patch({ text: { textColor: value } })
  }
  _focus() {
    this.alpha = 1
    if (!this.canSubmit) return (this.setText = InvalidRed)
    this.setText = Yellow
  }
  _unfocus() {
    this.alpha = 0.5
    this.setText = 0xffffffff
  }
  _handleEnter() {
    if (this.canSubmit) this.signal('onSubmit', this.submitTo)
  }
}
