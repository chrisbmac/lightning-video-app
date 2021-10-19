import { Lightning, Img, Utils } from '@lightningjs/sdk'
import Logo from '../Logo/logo'
export default class MovieView extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      w: 1920,
      h: 1080,
      texture: Img(Utils.asset('images/background.png')).original(),
      Text: {
        x: 850,
        y: 500,
        text: { text: 'Start Movie', fontSize: 70 },
      },
      Image: {
        x: 750,
        y: 500,
        color: 0xffffffff,
        texture: Img(Utils.asset('/svgs_icons/iconsMedium/icons8-circled-play-96.png')).original(),
      },
      Logo: {
        type: Logo,
      },
    }
  }
}
