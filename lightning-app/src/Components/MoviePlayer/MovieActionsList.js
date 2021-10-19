import { Lightning, Img, Utils } from '@lightningjs/sdk'
import MoviePlayerActions from './MoviePlayerActions'
export default class MovieActionsList extends Lightning.Component {
  static _template() {
    return {
      ButtonList: {
        flex: { direction: 'row' },
        Play: {
          type: MoviePlayerActions,
          flexItem: { marginRight: 20 },
          texture: Img(
            Utils.asset('/svgs_icons/iconsMedium/icons8-pause-button-96.png')
          ).original(),
        },
        Restart: {
          type: MoviePlayerActions,
          flexItem: { marginRight: 20 },
          texture: Img(Utils.asset('/svgs_icons/iconsMedium/icons8-reset-96.png')).original(),
        },
        Rewind: {
          type: MoviePlayerActions,
          flexItem: { marginRight: 20 },
          texture: Img(
            Utils.asset('/svgs_icons/iconsMedium/icons8-rewind-button-round-96.png')
          ).original(),
        },
        Forward: {
          type: MoviePlayerActions,
          flexItem: { marginRight: 20 },
          texture: Img(
            Utils.asset('/svgs_icons/iconsMedium/icons8-fast-forward-round-96.png')
          ).original(),
        },
        Hide: {
          type: MoviePlayerActions,
          flexItem: { marginRight: 20 },
          texture: Img(Utils.asset('/svgs_icons/iconsMedium/icons8-down-96.png')).original(),
        },
        Seek: {
          type: MoviePlayerActions,
          flexItem: { marginRight: 20 },
          texture: Img(Utils.asset('/svgs_icons/iconsMedium/icons8-skip-96.png')).original(),
        },
        Mute: {
          type: MoviePlayerActions,
          flexItem: { marginRight: 20 },
          texture: Img(Utils.asset('/svgs_icons/iconsMedium/icons8-low-volume-96.png')).original(),
        },
      },

      childrenLength: 0,
      handleNonEnter: false,
    }
  }
  set setMuteIcon(icon) {
    this.tag('Mute').patch({ texture: icon })
  }
  get muteIcon() {
    return Img(Utils.asset('/svgs_icons/iconsMedium/icons8-no-audio-96.png')).original()
  }
  get unmuteIcon() {
    return Img(Utils.asset('/svgs_icons/iconsMedium/icons8-low-volume-96.png')).original()
  }
  get playIcon() {
    return Img(Utils.asset('/svgs_icons/iconsMedium/icons8-circled-play-96.png')).original()
  }
  get pauseIcon() {
    return Img(Utils.asset('/svgs_icons/iconsMedium/icons8-pause-button-96.png')).original()
  }
  set playPauseIcon(icon) {
    this.tag('Play').patch({ texture: icon })
  }
  // check if controls are hidden
  get actions() {
    return this.fireAncestors('$getHiddenActionsList')
  }
  _init() {
    this.index = 0
    this.childrenLength = this.tag('ButtonList').children.length
  }
  _handleLeft() {
    if (!this.actions) return this._handleHiddenActionsList()
    if (this.index === 0) return
    this.index--
  }
  _handleRight() {
    if (!this.actions) return this._handleHiddenActionsList()
    if (this.index === this.childrenLength - 1) return
    this.index++
  }
  _getFocused() {
    return this.tag('ButtonList').children[this.index]
  }
  _handleHiddenActionsList(key) {
    this.index = 0
    this.signal('showActions', key)
  }
  async _handleEnter() {
    if (!this.actions) return this._handleHiddenActionsList('enter')
    switch (this.index) {
      case 0:
        this.signal('playPause')
        break
      case 1:
        this.signal('restart')
        break
      case 2:
        this.signal('rewind')
        break
      case 3:
        this.signal('fastForward')
        break
      case 4:
        this.signal('hideActions')
        break
      case 5:
        this.signal('seek')
        break
      case 6:
        this.signal('handleMute')
        break
    }
  }
}
