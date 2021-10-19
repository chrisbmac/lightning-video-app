import { Lightning, Img, Utils } from '@lightningjs/sdk'
import EOMButton from './EOMButton'
export default class EOMControls extends Lightning.Component {
  static _template() {
    return {
      FlexRow: {
        flex: { direction: 'row' },
        x: 50,
        y: 150,
        Back: {
          type: EOMButton,
          Text: { y: -45, x: -2, text: { text: 'Back', fontSize: 25, textColor: 0xffd9d9d9 } },
        },
        Replay: {
          type: EOMButton,
          Text: { y: -45, x: -5, text: { text: 'Replay', fontSize: 25, textColor: 0xffd9d9d9 } },
        },
      },
    }
  }
  _init() {
    this.index = 0
    this.tag('Back').patch({
      Icon: {
        texture: Img(Utils.asset('/svgs_icons/outline_arrow_back_black_24dp.png')).original(),
      },
    })
    this.tag('Replay').patch({
      Icon: { texture: Img(Utils.asset('/svgs_icons/icons8-replay-60.png')).original() },
    })
  }
  _handleRight() {
    if (this.index === this.tag('FlexRow').children.length - 1) return
    this.index++
  }
  _handleLeft() {
    if (this.index === 0) return
    this.index--
  }
  _handleEnter() {
    if (this.index === 0) {
      this.fireAncestors('$handEOMBack', '#main')
    } else if (this.index === 1) {
      this.fireAncestors('$handleReplay')
    }
  }

  _getFocused() {
    return this.tag('FlexRow').children[this.index]
  }
}
