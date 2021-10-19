import { Lightning } from '@lightningjs/sdk'
import { Yellow } from '../../Helpers/AppColors'

export default class MoviePoster extends Lightning.Component {
  static _template() {
    return {
      Image: {
        y: 200,
        x: 40,
        texture: '',
        ImageShaderLeftBorder: {
          x: -5,
          y: 0,
          h: 455,
          w: 5,
          color: 0xff000000,
          rect: true,
          LeftBorder: {
            x: -1,
            y: 0,
            h: 306,
            w: 2,
            color: Yellow,
            alpha: 0.6,
            rect: true,
          },
        },
        ImageShaderBottomBorder: {
          x: -5,
          y: 450,
          h: 5,
          w: 305,
          color: 0xff000000,
          rect: true,
          BottomBorder: {
            x: 0,
            alpha: 0.6,
            y: 4.8,
            h: 2,
            w: 205,
            color: Yellow,
            rect: true,
          },
        },
      },
    }
  }
}
