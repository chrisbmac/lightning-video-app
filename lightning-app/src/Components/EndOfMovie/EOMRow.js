import { Lightning, Img } from '@lightningjs/sdk'
import { getMoviePagePoster } from '../../Helpers/Helpers'
import Poster from './Poster'
export default class EOMRow extends Lightning.Component {
  static _template() {
    return {
      Row: {
        x: 150,
        y: 300,
        flex: { direct: 'row', marginRight: 50 },
      },
    }
  }
  _init() {
    this.index = 0
  }
  _handleRight() {
    if (this.index === this.row.children.length - 1) return
    this.row.children[this.index].visible = false
    this.index++
  }
  _handleLeft() {
    if (this.index === 0) return
    this.index--
    this.row.children[this.index].visible = true
  }
  _handleEnter() {
    this.fireAncestors('$handEOMBack', `movie/${this.row.children[this.index].movieId}`)
  }
  _active() {
    if (this.movies) this.buildPosters()
  }
  async buildPosters() {
    return (this.tag('Row').children = await Promise.all(
      this.movies.map(async el => {
        let yVal = -70
        if (el.title.length > 60) yVal = -100
        return {
          type: Poster,
          flexItem: { marginRight: 50 },
          Image: {
            w: 300,
            h: 400,
            texture: Img(await this._fetchPoster(el.poster_path)).contain(200, 200),
          },
          Description: { Text: { text: { text: el.overview, fontSize: 32 } } },
          movieId: el.id,
        }
      })
    ))
  }
  get row() {
    return this.tag('Row')
  }
  set smovies(movies) {
    return (this.movies = movies)
  }

  async _fetchPoster(url) {
    return await getMoviePagePoster(url)
  }
  _getFocused() {
    return this.tag('Row').children[this.index]
  }
}
