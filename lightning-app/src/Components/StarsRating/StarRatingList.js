import { Lightning, Img } from '@lightningjs/sdk'
import StarRating from './StarRating'
import EmojisRating from './EmojisRating'
export default class StarRatingList extends Lightning.Component {
  static _template() {
    return {
      StarRatingList: {
        stars: [],
        flex: { direction: 'row' },
      },
      RatingEmoji: {
        type: EmojisRating,
        zIndex: 8,
        x: -20,
        texture: '',
      },
      starsList: Array.from({ length: 10 }, (_, i) => i + 1),
      maxRating: 10,
    }
  }
  get emoji() {
    return this.tag('RatingEmoji').emojis[this.index - 1]
  }
  _firstActive() {
    this.tag('RatingEmoji').patch({ texture: Img(this.emoji).original() })
  }

  _init() {
    let visible = true
    this.tag('StarRatingList').children = this.starsList.map(i => {
      if (i > 5) visible = false
      return {
        type: StarRating,
        flexItem: { margin: 22 },
        visible: visible,
      }
    })
    this.index = 5
  }
  // was using child methods. Remove was not working. did have these in a single function, got messy and left as is
  _handleRight() {
    if (this.index === 10) return
    this.tag('StarRatingList').children[this.index].patch({ visible: true })
    this.index++
    this.fireAncestors('$setRating', this.index)
    this.tag('RatingEmoji').patch({ texture: Img(this.emoji).original() })
  }
  _handleLeft() {
    if (this.index === 1) return
    this.index--
    this.tag('StarRatingList').children[this.index].patch({ visible: false })
    this.fireAncestors('$setRating', this.index)
    this.tag('RatingEmoji').patch({ texture: Img(this.emoji).original() })
  }
  _handleEnter() {
    this.fireAncestors('$postData', this.index)
  }
  _getFocused() {
    return this.tag('StarRatingList').children[this.index]
  }
}
