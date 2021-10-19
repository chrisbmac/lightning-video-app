import { Lightning } from '@lightningjs/sdk'

export default class MovieBack extends Lightning.Component {
  static _template() {
    return {
      color: 0xff1f1f1f,
      texture: Lightning.Tools.getRoundRect(200, 40, 4),
      Label: {
        x: 100,
        y: 22,
        mount: 0.5,
        color: 0xffffffff,
        text: { text: 'Back', fontSize: 20 },
      },
    }
  }
}
