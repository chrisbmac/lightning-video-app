import { Lightning, Img, Utils } from '@lightningjs/sdk'

export default class StarRating extends Lightning.Component {
  static _template() {
    return {
      Star: {
        zIndex: 6,
        texture: Img(Utils.asset('/svgs_icons/icons8-star-48.png')).original(),
      },
    }
  }
  get starAnimation() {
    return this.tag('Star').animation({
      duration: 1,
      repeat: 0,
      stopMethod: 'immediate',
      actions: [
        {
          p: 'rotation',
          v: { 0: 0, 1: 6.29 },
        },
      ],
    })
  }
  _focus() {
    if (this.starAnimation.isActive()) return this.starAnimation.replay()
    this.starAnimation.start()
  }
  _unfocus() {
    this.starAnimation.finish()
  }
}
