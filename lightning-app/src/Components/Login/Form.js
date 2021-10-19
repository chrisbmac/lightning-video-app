import { Lightning } from '@lightningjs/sdk'
import Input from '../input'

export default class Form extends Lightning.Component {
  static _template() {
    return {
      y: 40,
      flex: { direction: 'column' },
      Inputs: { flex: { direction: 'column' } },
    }
  }
  _getFocused() {
    return this.tag('Inputs').children[this.index]
  }
  _handleDown() {
    if (this.index === this.tag('Inputs').children.length - 1) return
    this.index++
  }
  _handleUp() {
    if (this.index === 0) return
    this.index--
  }
  _init() {
    this.index = 0
    if (this.i === 'Create') {
      return this.createInputs
    } else if (this.i === 'Sign in') {
      return this.signInInputs
    }
  }
  get createInputs() {
    const createVals = ['Email', 'Password']
    return (this.tag('Inputs').children = createVals.map(i => {
      return {
        type: Input,
        i,
      }
    }))
  }
  get signInInputs() {
    const signInVals = ['Email', 'Password']
    return (this.tag('Inputs').children = signInVals.map(i => {
      return {
        type: Input,
        i,
      }
    }))
  }
}
