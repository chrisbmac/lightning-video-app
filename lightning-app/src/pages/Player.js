import { Lightning, Registry, VideoPlayer, Img, Utils } from '@lightningjs/sdk'
import { navigate } from '@lightningjs/sdk/src/Router'

import MovieActionsList from '../Components/MoviePlayer/MovieActionsList'
import MovieView from '../Components/MoviePlayer/MovieView'
import Seek from '../Components/MoviePlayer/Seek'
import EOM from '../Components/EndOfMovie/EOM.js'
import MoviePlayerActions from '../Components/MoviePlayer/MoviePlayerActions'
export default class Player extends Lightning.Component {
  static _template() {
    return {
      Back: {
        visible: false,
        type: MoviePlayerActions,
        x: 10,
        y: 10,
        texture: Img(Utils.asset('svgs_icons/iconsMedium/icons8-back-96.png')).original(),
      },
      Controls: {
        x: 450,
        y: 800,
        MovieActionsList: {
          x: 100,
          y: 100,
          zIndex: 5,
          type: MovieActionsList,
          visible: false,
          signals: {
            playPause: '_playPause',
            rewind: '_rewind',
            fastForward: '_fastForward',
            restart: '_restart',
            hideActions: '_hideActions',
            showActions: '_showActions',
            seek: '_seek',
            handleMute: '_handleMute',
          },
        },
      },
      Seek: {
        visible: false,
        type: Seek,
      },
      MovieInitScreen: {
        visible: true,
        type: MovieView,
      },
      EOM: {
        visible: false,
        type: EOM,
      },
      fadeTimer: 0,
      fadingActions: false,
      skip: 20,
    }
  }
  set params(args) {
    this.tag('EOM').movieTitle = args.movieTitle
  }
  get back() {
    return this.tag('Back')
  }
  get actionsAnimationFade() {
    return this.actionsList.animation({
      duration: 3,
      repeat: 0,
      stopMethod: 'fade',
      actions: [{ p: 'alpha', v: { 0: 0.8, 1: 0.7, 2: 0.5, 2.5: 0.1, 3: 0.15 } }],
    })
  }
  get currentTime() {
    return VideoPlayer.currentTime.toFixed(2)
  }
  get seek() {
    return this.tag('Seek')
  }
  get seekCurrentTime() {
    return this.seek.tag('CurrentTime')
  }
  get seekVideoLength() {
    return this.seek.tag('VideoLength')
  }
  get actionsList() {
    return this.tag('MovieActionsList')
  }
  get initScreenAnimation() {
    return this.tag('MovieInitScreen').animation({
      duration: 1,
      repeat: 0,
      stopMethod: 'immediate',
      actions: [
        { t: 'Text', p: 'visible', v: { 0: false } },
        { t: 'Image', p: 'visible', v: { 0: false } },
        { t: 'Logo', p: 'visible', v: { 0.75: false } },
        { p: 'x', v: { 0: 0, 1: 0 } },
        {
          p: 'w',
          v: {
            0: 1920,
            0.25: 1920 / 2,
            0.5: 1920 / 3,
            0.75: 1920 / 4,
            1: 1920 - 1920,
          },
        },
        { p: 'visible', v: { 0: true, 0.5: true, 1: false } },
      ],
    })
  }
  get similarMovies() {
    return this.similar
  }
  _onDataProvided() {
    this.tag('EOM').tag('EOMRow').smovies = this.similarMovies
  }

  pageTransition() {
    return 'crossfade'
  }
  _enable() {
    this.tag('MovieInitScreen').visible = true
    this.resetPage()
    this._setState('MovieInitScreen')
  }
  _init() {
    this._setState('MovieInitScreen')
    VideoPlayer.consumer(this)
    VideoPlayer.hide()
  }
  _handleUp() {
    if (!this.actionsList.visible) this.actionsList.visible = true
  }
  handlePageLeave(path) {
    this.resetPage()
    this._setState('')
    VideoPlayer.close()
    navigate(path)
  }
  resetPage() {
    this._hideActions()
    this.tag('MovieInitScreen').patch({
      w: 1920,
      h: 1080,
      Image: { visible: true },
      Logo: { visible: true },
      Text: { visible: true },
    })
    this.actionsList.visible = false
    this.back.visible = false
  }

  static _states() {
    return [
      class MovieInitScreen extends MovieView {
        $exit() {
          this.initScreenAnimation.start()
        }
        _handleEnter() {
          this._setState('MoviePlayer')
        }
      },
      class MoviePlayer extends MovieActionsList {
        $enter() {
          this.back.visible = true
          this.actionsList.visible = true
          this.btnIndex = 0
          VideoPlayer.position(0, 0)
          VideoPlayer.area()
          const videoPath = Utils.asset('/video/Sample Video.mp4')
          VideoPlayer.open(videoPath)
          Registry.setInterval(() => {
            this._checkForMovieEnded()
          }, 0.5)
        }
        _checkForMovieEnded() {
          if (VideoPlayer.duration === VideoPlayer.currentTime)
            this._setState('MoviePlayer.EndOfMovie'), this._hideActions()
        }
        $exit() {
          VideoPlayer.close()
        }
        _getFocused() {
          return this.actionsList
        }
        _handleUp() {
          if (!this.actionsList.visible) {
            return (
              (this.actionsList.visible = !this.actionsList.visible), (this.back.visible = true)
            )
          }
          this._setState('MoviePlayer.MovieSeek')
        }
        // mute unmute
        _handleMute() {
          VideoPlayer.mute(!VideoPlayer.muted)
          if (VideoPlayer.muted) {
            this.actionsList.setMuteIcon = this.actionsList.muteIcon
          } else if (!VideoPlayer.muted) {
            this.actionsList.setMuteIcon = this.actionsList.unmuteIcon
          }
        }
        //play/ pause video
        _playPause() {
          VideoPlayer.playPause()
          if (!VideoPlayer.playing) {
            this.actionsList.playPauseIcon = this.actionsList.pauseIcon
          } else if (VideoPlayer.playing) {
            this.actionsList.playPauseIcon = this.actionsList.playIcon
          }
        }
        _rewind() {
          VideoPlayer.skip(-this.skip)
        }
        _fastForward() {
          this._checkForMovieEnded()
          VideoPlayer.skip(this.skip)
        }
        _restart() {
          VideoPlayer.reload()
        }
        _hideActions() {
          this.actionsList.visible = false
          this.seek.visible = false
          this.back.visible = false
        }
        _seek() {
          this._setState('MoviePlayer.MovieSeek')
        }
        //show actions and play or pause video, if key = enter
        _showActions(key) {
          this.actionsList.visible = true
          if (key) this._playPause()
        }
        $getHiddenActionsList() {
          return this.actionsList.visible
        }
        _handleDown() {
          this._hideActions()
        }
        //NESTED STATES
        static _states() {
          return [
            class MovieSeek extends Seek {
              $enter() {
                this.seek.visible = true
                this.seekVideoLength.patch({ text: { text: VideoPlayer.duration.toFixed(2) } })
                this.seekCurrentTime.patch({ text: { text: this.currentTime } })
                Registry.setInterval(
                  (seekCurrentTime, seekPos) => {
                    if (VideoPlayer.currentTime === VideoPlayer.duration)
                      return this._setState('MoviePlayer.EOM')

                    const updateSeek = () => {
                      let x =
                        (VideoPlayer.currentTime / VideoPlayer.duration) * (window.innerWidth - 400)
                      if (x <= 0) x = x + 300
                      return x - 10
                    }
                    seekCurrentTime.patch({ text: { text: VideoPlayer.currentTime.toFixed(2) } })
                    seekPos.patch({
                      x: updateSeek(),
                    })
                  },
                  0.5,
                  this.seekCurrentTime,
                  this.seek.tag('JumpTo')
                )
              }
              $exit() {
                this.seek.visible = false
              }
              _handleDown() {
                this._setState('MoviePlayer')
              }
              _handleLeft() {
                this._updateSeek(null)
              }
              _handleRight() {
                this._updateSeek('add')
              }
              _handleUp() {
                this._setState('MoviePlayer.BackBtn')
              }
              checkVideoEnded() {
                if (VideoPlayer.currentTime === VideoPlayer.duration)
                  return this._setState('MoviePlayer.EOM')
              }
              _updateScreenSeek() {
                let x = (VideoPlayer.currentTime / VideoPlayer.duration) * (window.innerWidth - 400)
                if (x <= 0) x = x + 300
                return x
              }
              _updateSeek(symbol) {
                this.checkVideoEnded()
                let jumpTo = 0
                if (symbol === 'add') {
                  jumpTo = 5
                } else {
                  jumpTo = -5
                }
                this.seek.tag('JumpTo').patch({ x: this._updateScreenSeek() })
                VideoPlayer.skip(jumpTo)
              }
            },
            // handle end of movie
            class EndOfMovie extends EOM {
              $enter() {
                Registry.clearIntervals()
                const myAnimation = this.tag('EOM').animation({
                  duration: 1,
                  repeat: 0,
                  stopMethod: 'immediate',
                  actions: [{ p: 'alpha', v: { 0: 0, 1: 1 } }],
                })
                myAnimation.start()
                this.tag('EOM').visible = true
                this.actionsList.visible = false
                this.seek.visible = false
                this.back.visible = false
              }
              $exit() {
                this.tag('EOM').visible = false
              }
              _getFocused() {
                return this.tag('EOM')
              }
              $handEOMBack(path) {
                this.handlePageLeave(path)
              }
              $handleReplay() {
                this._setState('MoviePlayer')
                VideoPlayer.reload()
              }
            },
            class BackBtn extends MoviePlayerActions {
              _handleDown() {
                this._setState('MoviePlayer.MovieSeek')
              }
              _handleEnter() {
                this.handlePageLeave('#main')
              }
              _handleRight() {
                this._setState('MoviePlayer.MovieSeek')
              }
              _getFocused() {
                return this.back
              }
            },
          ]
        }
      },
    ]
  }
}
