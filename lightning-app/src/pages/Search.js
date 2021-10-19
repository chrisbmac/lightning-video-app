import { Lightning } from '@lightningjs/sdk'
import SearchBar from '../Components/Search/SearchBar'
import SearchResults from '../Components/Search/SearchResults'
export default class Search extends Lightning.Component {
  static _template() {
    return {
      Page: {
        h: 500,
        w: 500,
        flex: { direction: 'column', padding: 10 },
        Header: { text: { text: 'Search page', textColor: 0xff000000 } },
        SearchBar: { type: SearchBar },
        SearchResults: { type: SearchResults },
      },
    }
  }
}
