import { Lightning } from '@lightningjs/sdk'
import KeyBoardButton from './KeyBoardButton.js'
export default class NumberKeyBoard extends Lightning.Component {
  static _template() {
    return {
      KeyBoard: {
        x: 700,
        y: 300,
        zIndex: 10,
        Title: {
          text: { text: 'Rate This Movie' },
        },
        Rating: {
          y: 55,
          x: 3,
          Label: {
            text: { text: 'Your rating: ', fontSize: 20 },
          },
          Holder: {
            x: 110,
            y: 2,
            text: { text: '0', fontSize: 20 },
          },
        },
        AllKeys: {
          type: KeyBoardButton,
          zIndex: 10,
          keys: [],
        },
      },
      padLength: 0,
      rating: null,
    }
  }

  _init() {
    this.index = 0
    const keysArr = [
      '0.5',
      '1',
      '1.5',
      '2',
      '2.5',
      '3.5',
      '4',
      '4.5',
      '5',
      '5.5',
      '6',
      '6.5',
      '7',
      '7.5',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      'Okay',
      'Close',
    ]
    let x = -50
    let y = 50
    let count = -1
    let labelX = 15
    let width = 60
    this.padLength = keysArr.length
    return (this.tag('AllKeys').children = keysArr.map((key, ind) => {
      count++
      y += 60
      if (count === 5) {
        count = 0
        x += 80
        y = 110
      }
      if (key === 'Okay') {
        x = -10
        y = 430
        width = 100
      } else if (key === 'Close') {
        x = 100
        y = 430
        width = 100
      } else {
        width = 60
      }
      if (key.length < 2) {
        labelX = 15
      } else {
        labelX = 5
      }
      return {
        zIndex: 5,
        rect: true,
        w: width,
        h: 40,
        color: 0xff000000,
        type: KeyBoardButton,
        y: y,
        x: x,
        Label: {
          x: labelX,
          y: -2,
          zIndex: 6,
          text: { text: key, fontSize: 35, textAlign: 'center' },
        },
      }
    }))
  }
  _getFocused() {
    return this.tag('AllKeys').children[this.index]
  }
  _handleUp() {
    if (this.index === this.padLength - 1 || this.index === this.padLength - 2)
      return (this.index = 9)
    if (this.index % 5 === 0) return
    return (this.index -= 1)
  }
  _handleDown() {
    if (
      this.index === 4 ||
      this.index === 9 ||
      this.index === 14 ||
      this.index + 1 === this.padLength
    )
      return (this.index = this.padLength - 1)
    return (this.index += 1)
  }
  _handleRight() {
    if (this.index === this.padLength - 2) return (this.index = this.padLength - 1)
    if (this.index > 14) return
    return (this.index += 5)
  }
  _handleLeft() {
    if (this.index < 5) return
    if (this.index === this.padLength - 1) return (this.index = this.padLength - 2)
    return (this.index -= 5)
  }
  _handleEnter() {
    if (this.tag('AllKeys').children[this.index].tag('Label').text._text === 'Close') {
      this.fireAncestors('$closePostPanel')
    } else if (this.tag('AllKeys').children[this.index].tag('Label').text._text === 'Okay') {
      if (!this.rating)
        return this.tag('Rating').children[1].patch({
          text: { text: 'Please choose a rating for this movie.', textColor: 0xfff0ec00, w: 300 },
        })
      this.fireAncestors('$postData', this.rating)
      this.fireAncestors('$closePostPanel')
    } else {
      this.rating = this.tag('AllKeys').children[this.index].tag('Label').text._text
      this.tag('Rating').children[1].patch({ text: { text: this.rating } })
    }
  }
}
