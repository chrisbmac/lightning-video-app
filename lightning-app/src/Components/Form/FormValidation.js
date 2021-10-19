import { Lightning } from '@lightningjs/sdk'
import { InvalidRed } from '../../Helpers/AppColors'
import { Email_Validation, Password_Validation } from '../../Helpers/Validation'

export default class FormValidation extends Lightning.Component {
  static _template() {
    return {
      visible: false,
      zIndex: 10,
      Text: { zIndex: 1, text: { text: '', textColor: InvalidRed, fontSize: 20 } },
      BG: { zIndex: -1, rect: true, color: 0xff000000, alpha: 0.8, w: 300, h: 30 },
    }
  }
  validateEmail(email) {
    return Email_Validation.test(String(email).toLowerCase())
  }
  set text(value) {
    this.tag('Text').patch({ text: { text: `Invalid ${value}` } })
  }

  validatePassword(password) {
    return Password_Validation.test(String(password))
  }

  validateText(text) {
    return text.length >= 3
  }

  passCorrectValidator(type, value) {
    if (!type || !value) return false
    if (type === 'Email') {
      return this.validateEmail(value)
    } else if (type === 'Password') {
      return this.validatePassword(value)
    } else if (type === 'First Name' || type === 'Last Name') {
      return this.validateText(value)
    }
  }
}
