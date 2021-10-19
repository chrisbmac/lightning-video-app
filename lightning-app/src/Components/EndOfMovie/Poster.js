import { Lightning } from '@lightningjs/sdk'

export default class Poster extends Lightning.Component {
  static _template() {
    return {
      y: 300,
      h: 500,
      w: 300,
      zIndex: 1,
      Description: {
        BG: {
          x: 420,
          y: -10,
          alpha: 0.7,
          texture: Lightning.Tools.getRoundRect(1100, 600, 4, 3, 0xff000000, true, 0xff303030),
          visible: false,
        },
        Text: {
          x: 450,
          w: 1000,
          visible: false,
        },
      },
      Image: {
        zIndex: 2,
        h: 500,
        w: 400,
      },
      LeftBorder: {
        zIndex: 0,
        rect: true,
        color: 0xff000000,
        h: 400,
        w: 4,
        x: -5,
      },
      Shadow: {
        zIndex: 0,
        x: -5,
        color: 0x66000000,
        texture: Lightning.Tools.getShadowRect(320, 400, 1, 10, 5),
      },
    }
  }
  get image() {
    return this.tag('Image')
  }
  get description() {
    return this.tag('Description').tag('Text')
  }
  get background() {
    return this.tag('Description').tag('BG')
  }
  get posterFocusAnimation() {
    return this.animation({
      duration: 0.3,
      repeat: 0,
      stopMethod: 'immediate',
      actions: [
        { p: 'alpha', v: { 0: 0, 1: 1 } },
        { p: 'y', v: { 0: 0, 0.1: 5, 0.2: 7, 0.3: 10 } },
        { p: 'x', v: { 0: 0, 0.3: -100 } },
      ],
    })
  }
  get posterUnfocusAnimation() {
    return this.animation({
      duration: 0.3,
      repeat: 0,
      stopMethod: 'immediate',
      actions: [
        { p: 'alpha', v: { 0: 0, 1: 1 } },
        { p: 'y', v: { 0: 0, 0.1: -50, 0.2: 50, 0.3: 300 } },
        { p: 'x', v: { 0: 0, 0.3: 0 } },
      ],
    })
  }
  _init() {
    this._posterInitSpinAnimation = this.animation({
      duartion: 0.3,
      repeat: 0,
      stopMethod: 'fade',
      actions: [{ p: 'rotation', v: { 0: 0, 0.3: 6.29 } }],
    })
    this._posterInitSpinAnimation.start()
    this._posterAnimationRotate = this.animation({
      duartion: 0.3,
      repeat: 0,
      stopMethod: 'fade',
      actions: [{ p: 'rotation', v: { 0: 0, 0.3: 6.29 } }],
    })
    this._posterAnimationRotate.start()
  }
  _focus() {
    this.posterFocusAnimation.stop()
    this.posterFocusAnimation.start()
    this.zIndex = 2
    this.alpha = 1
    this.image.h = 500
    this.image.w = 400
    this.tag('LeftBorder').visible = false
    this.description.visible = true
    if (this.description.text._text.length > 460) {
      this.background.visible = true
    } else {
      this.background.visible = false
    }
  }
  _unfocus() {
    this.posterFocusAnimation.stop()
    this.posterUnfocusAnimation.start()
    this.background.visible = false
    this.y = 200
    this.zIndex = 1
    this.alpha = 0.8
    this.image.h = 400
    this.image.w = 300
    this.tag('LeftBorder').visible = true
    this.description.visible = false
  }
}
