import { Lightning } from '@lightningjs/sdk'

export default class Seek extends Lightning.Component {
  static _template() {
    return {
      Bar: {
        x: 200,
        y: 830,
        w: window.innerWidth - 400,
        h: 20,
        rect: true,
        alpha: 0.7,
        color: 0xff000000,
        CurrentTime: {
          alpha: 1,
          x: 0,
          y: -25,
          text: { text: '', fontSize: 18 },
        },
        VideoLength: {
          alpha: 1,
          x: window.innerWidth - 440,
          y: -25,
          text: { text: '', fontSize: 18 },
        },
        JumpTo: {
          alpha: 1,
          x: 0,
          y: -2,
          text: { text: '||', fontSize: 21, fontStyle: 'bold' },
        },
      },
    }
  }
}
