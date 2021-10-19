import { Lightning } from '@lightningjs/sdk'
import Button from '../Button'
import Form from '../Form/Form'
export default class ButtonList extends Lightning.Component {
  static _template() {
    return {
      zIndex: 2,
      flex: { direction: 'row' },
    }
  }
  _init() {
    this.index = 0
    this.children = this.btnTexts.map(i => {
      return {
        type: Button,
        Text: { text: { text: i, fontSize: 25 } },
        Form: { type: Form, visible: false, i },
      }
    })
    this._setState('SignIn')
  }
  get btnTexts() {
    return ['Sign in', 'Guest', 'Create']
  }
  // pass in index to set un/visible
  handleCategoryFocus(index) {
    this.children[index].tag('Form').visible = !this.children[index].tag('Form').visible
    this.children[index].underLine.visible = !this.children[index].underLine.visible
  }
  static _states() {
    return [
      class LoginMain extends this {
        _getFocused() {
          return this.children[this.index]
        }
      },
      class SignIn extends Button {
        $enter() {
          this.handleCategoryFocus(0)
        }
        $exit() {
          this.handleCategoryFocus(0)
        }
        _getFocused() {
          return this.children[0].tag('Form')
        }
        $leaveThisState() {
          this._setState('LoginMain')
        }
        _handleRight() {
          this._setState('Guest')
        }
        _handleLeft() {
          return
        }
      },
      class Guest extends Button {
        $enter() {
          this.handleCategoryFocus(1)
        }
        $exit() {
          this.handleCategoryFocus(1)
        }
        _getFocused() {
          return this.children[1].tag('Form')
        }
        $leaveThisState() {
          this._setState('LoginMain')
        }
        _handleRight() {
          this._setState('Create')
        }
        _handleLeft() {
          this._setState('SignIn')
        }
      },
      class Create extends Button {
        $enter() {
          this.handleCategoryFocus(2)
        }
        $exit() {
          this.handleCategoryFocus(2)
        }
        _getFocused() {
          return this.children[2].tag('Form')
        }
        $leaveThisState() {
          this._setState('LoginMain')
        }
        _handleRight() {
          return
        }
        _handleLeft() {
          this._setState('Guest')
        }
      },
    ]
  }
}
