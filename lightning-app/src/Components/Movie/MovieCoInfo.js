import { Lightning } from '@lightningjs/sdk'
import MovieCoItems from './MovieCoItems'
export default class MovieCoInfo extends Lightning.Component {
  static _template() {
    const xAxis = 280
    const yAxis = 600
    return {
      MovieGenres: {
        x: xAxis,
        y: yAxis,
        type: MovieCoItems,
        genres: [],
      },
      MovieStudios: {
        x: xAxis,
        y: yAxis,
        type: MovieCoItems,
        studios: [],
      },
      MovieLanguages: {
        x: xAxis,
        y: yAxis,
        type: MovieCoItems,
        languages: [],
      },
    }
  }
}
