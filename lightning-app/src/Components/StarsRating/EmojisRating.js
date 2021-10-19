import { Lightning, Utils } from '@lightningjs/sdk'

export default class EmojisRating extends Lightning.Component {
  $createPath(file) {
    return Utils.asset(`/emojis/icons8-${file}-48.png`)
  }
  _init() {
    this.emojisList = [
      this.$createPath('disgusting'),
      this.$createPath('sad'),
      this.$createPath('unamused-face'),
      this.$createPath('bored'),
      this.$createPath('disappointed-face'),
      this.$createPath('expressionless-face'),
      this.$createPath('upside-down-face'),
      this.$createPath('happy'),
      this.$createPath('star-struck'),
      this.$createPath('super-mario'),
    ]
  }

  get emojis() {
    return this.emojisList
  }
}
