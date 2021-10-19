import { Lightning } from '@lightningjs/sdk'
import { Yellow } from '../../Helpers/AppColors'

export default class SimMoviesDescription extends Lightning.Component {
  static _template() {
    return {
      x: 885,
      y: 0,
      w: 850,
      h: 870,
      zIndex: 7,
      texture: '',
      Title: {
        color: 0xffb8b8b8,
        zIndex: 4,
        x: 0,
        y: 50,
        w: 680,
        h: 50,
        TitleText: {
          zIndex: 2,
          x: 5,
          y: 2,
          text: { text: 'TITLE', fontSize: 25, fontStyle: 'bold' },
        },
        BG: {
          y: 0,
          x: 0,
          rect: true,
          w: 850,
          h: 50,
          alpha: 0.7,
          color: 0xff000000,
        },
      },
      BG: {
        rect: true,
        color: 0xff000000,
        w: 850,
        h: 870,
        zIndex: 0,
        alpha: 0.7,
      },
      Divider: {
        rect: true,
        w: 680,
        h: 5,
        color: 0xff000000,
        x: 10,
        y: 58,
      },
      BackDrop: {
        Image: {
          x: 0,
          y: 50,
          texture: '',
          BottomShadow: {
            alpha: 0.35,
            y: 478,
            rect: true,
            colorTop: Yellow,
            colorBottom: 0xff00000,
            w: 850,
            h: 10,
          },
        },
      },
      Text: {
        zIndex: 1,
        w: 775,
        h: 420,
        x: 20,
        y: 535,
        text: { text: '', lineHeight: 25, fontSize: 20, shadow: true },
      },
      GoTo: {
        x: 790,
        y: 820,
        Text: { text: { text: 'Go To >', fontSize: 15 } },
      },
      BottomBorder: {
        rect: true,
        alpha: 0.5,
        y: 850,
        texture: Lightning.Tools.getRoundRect(850, 10, 4, null, null, true, Yellow),
      },
    }
  }
}
