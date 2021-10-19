import { Lightning, Router, Img, Utils } from '@lightningjs/sdk'
export default class ErrorPage extends Lightning.Component {
  static _template() {
    return {
      Error: {
        ErrorText: {
          color: 0xff000000,
          x: 50,
          y: 20,
          text: { text: 'Oops something went wrong :( ...' },
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
      },
      Cursor: {
        x: 500,
        y: 500,
        color: 0xff000000,
        text: { text: 'X - try me!' },
      },
    }
  }
  _handleEnter() {
    Router.navigate('#main')
  }
  pageTransition() {
    return 'crossfade'
  }
  _active() {
    this.tag('Button').setSmooth('x', 55)
  }
  _init() {
    const arrowAnimation = this.tag('Button').animation({
      duration: 1,
      repeat: -1,
      stopMethod: 'immediate',
      actions: [{ p: 'x', v: { 0: 50, 0.25: 52.5, 0.5: 55, 0.75: 52.5, 1: 50 } }],
    })
    arrowAnimation.start()
  }

  // pass in direction on y axis
  $handleMovement(direction, axis) {
    const movementValue = 20
    let elAxis = this.tag('Cursor')
    elAxis.text = 'X'
    let axisValue
    if (elAxis < 10) axisValue = 500
    if (axis === 'y') {
      console.log('1')
      if (direction === 'up') {
        axisValue = elAxis.y - movementValue
      } else {
        axisValue = elAxis.y + movementValue
      }
      this.tag('Cursor').patch({ y: axisValue })
    } else {
      console.log('2')
      if (direction === 'right') {
        axisValue = elAxis.x + movementValue
      } else {
        axisValue = elAxis.x - movementValue
      }
      this.tag('Cursor').patch({ x: axisValue })
    }
  }

  _handleUp() {
    this.$handleMovement('up', 'y')
  }
  _handleDown() {
    this.$handleMovement('down', 'y')
  }
  _handleRight() {
    this.$handleMovement('right', 'x')
  }
  _handleLeft() {
    this.$handleMovement('left', 'x')
  }
}
