import { Lightning } from '@lightningjs/sdk'
import Input from './Input'
import FormButton from './FormButton'
import { authenticateUser, guestSession, createUser } from '../../Helpers/User.js'
import { InvalidRed } from '../../Helpers/AppColors'
export default class Form extends Lightning.Component {
  static _template() {
    return {
      y: 40,
      Column: { flex: { direction: 'column' } },
      formPassed: null,
      ResMsg: {
        x: 0,
        y: -140,
        zIndex: 5,
        text: { text: '', fontSize: 30, textColor: InvalidRed },
      },
    }
  }
  _active() {
    this.tag('ResMsg').patch({ text: { text: '' } })
    this.formPassed = null
  }
  _focus() {
    const myAnimation = this.animation({
      duration: 0.5,
      repeat: 0,
      stopMethod: 'immediate',
      actions: [
        { p: 'alpha', v: { 0: 0, 1: 1 } },
        { p: 'y', v: { 0: 0, 0.25: 50, 1: 0 } },
      ],
    })
    myAnimation.start()
  }
  _getFocused() {
    return this.tag('Column').children[this.index]
  }
  _handleDown() {
    if (this.index === this.tag('Column').children.length - 1) return
    const submitButton = this.tag('Column').children.find(
      element => element.elementType === 'Submit'
    )
    if (this.index === this.tag('Column').children.length - 2) {
      this.tag('Column').children.forEach(i => {
        if (i.elementType && i.elementType === 'Input')
          i.pass ? (this.formPassed = true) : (this.formPassed = false)
      })
    }
    if (this.formPassed) submitButton.canSubmit = true
    this.index++
  }
  _handleUp() {
    if (this.index === 0) return
    this.index--
  }
  //submit form - get values
  async _onSubmit(submitTo) {
    let inputValues = {}
    this.tag('Column').children.forEach(element => {
      if (element.elementType === 'Input') {
        if (element.inputType === 'Email') {
          inputValues.email = element.tag('Input').tag('Label').text._text
        } else if (element.inputType === 'Password') {
          inputValues.password = element.tag('Input').tag('Label').text._text
        } else if (element.inputType === 'First Name') {
          inputValues.firstName = element.tag('Input').tag('Label').text._text
        } else if (element.inputType === 'Last Name') {
          inputValues.lastName = element.tag('Input').tag('Label').text._text
        }
      }
    })
    const response = await submitTo(inputValues)
    if (response.pass_status === 'failed') return this.handleFailedSignin(response)
    if (response) {
      this.fireAncestors('$setAuthenticated', true)
      this.fireAncestors('$navigate', 'main', response)
    }
    console.log('inside form response from server', response)
  }

  handleFailedSignin(resp) {
    this.formPassed = null
    this.tag('ResMsg').patch({ text: { text: resp.msg } })
  }

  buildFormButton(tag, elementType, submitTo, text, canSubmit = false) {
    this.tag(tag).add({
      type: FormButton,
      textValue: text,
      elementType,
      submitTo,
      canSubmit,
      signals: { onSubmit: '_onSubmit' },
    })
  }
  buildInputs(elementType, array) {
    return this.tag('Column').add(
      array.map(i => {
        return {
          type: Input,
          i,
          elementType,
        }
      })
    )
  }
  _init() {
    this.index = 0
    const elementType = 'Submit'
    if (this.i === 'Create') {
      // for create form
      this.createInputs()
      const submitTo = createUser
      this.buildFormButton('Column', elementType, submitTo, 'Create', false)
    } else if (this.i === 'Sign in') {
      this.signInInputs()
      const submitTo = authenticateUser
      this.buildFormButton('Column', elementType, submitTo, 'Okay', false)
    } else if (this.i === 'Guest') {
      const submitTo = guestSession
      this.buildFormButton('Column', elementType, submitTo, 'Continue as guest', true)
    }
  }
  createInputs() {
    const elementType = 'Input'
    // add more to generate more inputs
    const createVals = ['Email', 'Password', 'First Name', 'Last Name']
    this.buildInputs(elementType, createVals)
  }
  signInInputs() {
    const elementType = 'Input'
    const signInVals = ['Email', 'Password']
    this.buildInputs(elementType, signInVals)
  }
}
