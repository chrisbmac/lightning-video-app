import { Lightning } from '@lightningjs/sdk'
export default class KeyBoardOutput extends Lightning.Component {
  static _template() {
    return {
      Text: { text: { text: '', textColor: 0xffffffff, fontSize: 35 } },
      BG: { zIndex: -1, alpha: 0.6, rect: true, w: 700, h: 50, x: 0, y: 0, color: 0xff000000 },
    }
  }
  set setText(value) {
    let newText = this.text
    newText += value
    this.tag('Text').patch({ text: { text: newText } })
  }
  get text() {
    return this.tag('Text').text._text
  }
}
