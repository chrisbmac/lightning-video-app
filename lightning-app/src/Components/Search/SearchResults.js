import { Lightning } from '@lightningjs/sdk'

export default class SearchResults extends Lightning.Component {
  static _template() {
    return {
      Heading: { text: { text: 'Search Results', textColor: 0xff000000 } },
    }
  }
}
