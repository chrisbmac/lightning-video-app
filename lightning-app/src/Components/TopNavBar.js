import { Lightning, Utils, Img } from '@lightningjs/sdk'
import Logo from '../Components/Logo/logo'
export default class TopNavBar extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf') }]
  }
  static _template() {
    return {
      Header: {
        rect: true,
        w: 1920,
        h: 80,
        texture: Img(Utils.asset('/images/background.png')).original(),
        Logo: {
          x: 15,
          type: Logo,
        },
      },
    }
  }
}
