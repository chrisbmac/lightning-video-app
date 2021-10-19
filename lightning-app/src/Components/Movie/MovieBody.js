import { Lightning } from '@lightningjs/sdk'

import MovieDescription from './MovieDescription'
import MovieMetaData from './MovieMetaData'
import MoviePoster from './MoviePoster'
import MovieActions from './MovieActions'
import MovieCoInfo from './MovieCoInfo'
export default class MovieBody extends Lightning.Component {
  static _template() {
    return {
      Description: {
        x: 100,
        type: MovieDescription,
      },
      MetaData: {
        x: 100,
        type: MovieMetaData,
      },
      MoviePoster: {
        //x: 200,
        type: MoviePoster,
      },
      MovieActions: {
        x: 100,
        type: MovieActions,
        passSignals: {
          toggleText: true,
        },
      },
      MovieCoInfo: {
        x: 100,
        type: MovieCoInfo,
      },
    }
  }

  _getFocused() {
    return this.tag('MovieActions')
  }
  _init() {
    this.index = 0
  }
}
