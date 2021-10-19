import { Lightning } from '@lightningjs/sdk'

export default class Welcome extends Lightning.Component {
  static _template() {
    return {
      zIndex: 6,
      visible: false,
      BG: {
        x: 0,
        y: 0,
        w: 1920,
        h: 1080,
        rect: true,
        color: 0xff000000,
      },
      Text: {
        zIndex: 1,
        y: 500,
        text: { text: 'Hi', fontSize: 45, textColor: 0xffffffff },
      },
    }
  }

  set welcomeText(val) {
    this.tag('Text').patch({ text: { text: `Hi ${val}` } })
  }
}
