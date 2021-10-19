import { Lightning } from '@lightningjs/sdk'

export default class MovieDescription extends Lightning.Component {
  static _template() {
    return {
      Description: {
        x: 280,
        y: 420,
        w: 800,
        text: { text: 'Description', fontSize: 20 },
      },
    }
  }
}
