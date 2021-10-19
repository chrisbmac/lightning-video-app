import { Lightning } from '@lightningjs/sdk'

export default class KeyBoardButton extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      w: 0,
      h: 0,
      color: 0xff000000,
      Text: {},
    }
  }

  _focus() {
    this.color = 0xff4d4d4d
  }
  _unfocus() {
    this.color = 0xff000000
  }
  _handleEnter() {
    this.fireAncestors('$handleKeyPress', this.tag('Text').text._text)
  }
}
