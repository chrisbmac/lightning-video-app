import { Lightning } from '@lightningjs/sdk'
import SimMoviesLoading from './SimMoviesLoading'

export default class SimMoviesLoadingList extends Lightning.Component {
  static _template() {
    return {
      LoadingList: {
        zIndex: 8,
        y: 100,
        x: 1750,
        h: 900,
        flex: { direction: 'column' },
      },
    }
  }

  _init() {
    this.tag('LoadingList').children = [1, 2, 3, 4, 5].map(() => {
      return {
        type: SimMoviesLoading,
        flexItem: { marginBottom: 163 },
      }
    })
  }
}
