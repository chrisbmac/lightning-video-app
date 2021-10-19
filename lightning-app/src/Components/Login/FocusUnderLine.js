import { Lightning } from '@lightningjs/sdk'
import { Yellow } from '../../Helpers/AppColors.js'

export default class FocusUnderLine extends Lightning.Component {
  static _template() {
    return {
      UnderLine: {
        y: 30,
        x: -2,
        visible: false,
        texture: Lightning.Tools.getRoundRect(100, 5, 4, 2, 0xff000000, true, Yellow),
      },
    }
  }
}
