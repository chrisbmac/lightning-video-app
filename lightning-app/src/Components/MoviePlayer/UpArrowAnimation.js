import { Lightning } from '@lightningjs/sdk'

export default class UpArrowAnimation extends Lightning.Component {
  static _template() {
    return {
      x: 900,
      y: 820,
      text: { text: '^', fontSize: 50 },
    }
  }

  _init() {
    const arrowAnimation = this.animation({
      duration: 1, //duration of 1 second
      repeat: -1, //Plays only once
      stopMethod: 'immediate', //Stops the animation immediately
      actions: [
        { p: 'alpha', v: { 0: 0, 1: 1 } },
        { p: 'y', v: { 0: 820, 0.25: 800, 0.75: 790, 1: 770 } },
      ],
    })
    arrowAnimation.start()
  }
}
