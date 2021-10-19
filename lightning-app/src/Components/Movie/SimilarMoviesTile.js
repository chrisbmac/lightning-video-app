import { Lightning } from '@lightningjs/sdk'
import { Yellow } from '../../Helpers/AppColors'

export default class SimilarMoviesTile extends Lightning.Component {
  static _template() {
    return {
      w: 150,
      h: 212,
      Border: {
        zIndex: -1,
        rect: true,
        visible: false,
        w: 148,
        h: 211,
        x: -7,
        y: -5,
        color: Yellow,
      },
    }
  }
  // update description panel
  async _focus() {
    this.tag('Border').visible = true
    this.fireAncestors('$fireDescriptionAnimation')
    this.signal('movieOverView')
    this.signal('movieTitle')
    this.signal('movieBackDrop')
  }
  _unfocus() {
    this.tag('Border').visible = false
  }
}
