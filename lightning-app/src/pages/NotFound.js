import { Lightning, Router, Img, Utils } from '@lightningjs/sdk'
export default class NotFound extends Lightning.Component {
  static _template() {
    return {
      NotFound: {
        Message: {
          y: 10,
          x: 50,
          color: 0xff000000,
          text: { text: 'UH OH, this page does not exist' },
        },
      },
      Button: {
        transitions: { x: { duration: 1, timingFunction: 'linear' } },
        x: 50,
        y: 100,
        texture: Img(Utils.asset('/svgs_icons/outline_arrow_back_black_24dp.png')).original(),
        ButtonText: {
          color: 0xff000000,
          x: 50,
          text: { text: 'Back to home', fontSize: 18 },
        },
      },
    }
  }
  _handleEnter() {
    Router.navigate('#main')
  }
}
