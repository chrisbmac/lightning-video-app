import { Lightning } from '@lightningjs/sdk'
import { searchMovies } from '../../Helpers/Helpers'

export default class SearchBar extends Lightning.Component {
  static _template() {
    return {
      Bar: {
        texture: Lightning.Tools.getRoundRect(200, 50, 4, 3, 0xff000000, true, 0xff000000),
      },
      Input: {
        text: { text: 'Value' },
      },
      Button: {
        texture: Lightning.Tools.getRoundRect(200, 50, 4, 3, 0xffffffff, true, 0xffffffff),
        text: { text: 'Search', textColor: 0xff000000 },
      },
    }
  }

  getMovies(query) {
    console.log('inside get movies', query)
    searchMovies(query)
  }
}
