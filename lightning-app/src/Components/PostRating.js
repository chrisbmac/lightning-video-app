import { Lightning, Img, Utils } from '@lightningjs/sdk'
import { postMovieRating, createGuestSession } from '../Helpers/Helpers.js'
import StarRatingList from './StarsRating/StarRatingList.js'
import MovieButton from './Movie/MovieButton.js'

export default class PostRating extends Lightning.Component {
  static _template() {
    return {
      Post: {
        BackGround: {
          rect: true,
          zIndex: 5,
          x: -100,
          y: 0,
          w: 1920,
          h: 1080,
          alpha: 0.8,
          color: 0xff000000,
        },
        PostPanel: {
          x: 520,
          y: 300,
          w: 800,
          h: 300,
          zIndex: 5,
          rect: true,
          texture: Lightning.Tools.getRoundRect(800, 300, 20, 3, 0xffffffff, true, 0xff1c3fa9),
        },
        StarRatingList: {
          x: 670,
          y: 480,
          type: StarRatingList,
        },
        CurrentRating: {
          zIndex: 5,
          x: 680,
          y: 325,
          flex: { direction: 'row' },
          Text1: { flexItem: { marginRight: 10 }, text: { text: 'Current', fontSize: 20 } },
          Image: {
            flexItem: { marginRight: 10 },
            y: -10,
            texture: Img(Utils.asset('/svgs_icons/icons8-imdb-48.png')).original(),
          },
          Text2: { flexItem: { marginRight: 10 }, text: { text: 'Rating', fontSize: 20 } },
          Rating: { text: { text: '7/10', fontSize: 20 } },
        },
        Title: {
          x: 600,
          y: 375,
          w: 750,
          flex: { direction: 'row', wrap: true },
          zIndex: 7,

          StartText: { text: { text: 'Give', fontSize: 30 } },
          MovieTitle: {
            flexItem: { marginLeft: 10 },
            text: { text: '', textColor: 0xffa3a3a3, fontSize: 30, fontStyle: 'bold' },
          },
          Rating: {
            flexItem: { marginLeft: 10 },
            text: { text: 5, textColor: 0xffe8e400, fontSize: 30, fontStyle: 'bold' },
          },
          EndText: {
            flexItem: { marginLeft: 10 },
            text: { text: 'out of 10 stars', fontSize: 30, wordWrap: true },
          },
        },
        Back: {
          zIndex: 5,
          type: MovieButton,
          x: 580,
          y: 320,
          texture: Lightning.Tools.getRoundRect(50, 50, 4),
          BackLabel: {
            y: 5,
            x: 20,
            text: { text: 'x', textColor: 0xff000000, fontSize: 27 },
          },
        },
      },

      postMovieId: null,
    }
  }
  _focus() {
    console.log('focus')
    const postPanelAnim = this.tag('Post').animation({
      duration: 0.5, //duration of 1 second
      repeat: 0, //Plays only once
      stopMethod: 'immediate', //Stops the animation immediately
      actions: [
        { p: 'alpha', v: { 0: 0, 1: 1 } },
        // {p: 'y', v: {0: 0, 0.25: 50, 0.75: -50, 1: 0}}
      ],
    })
    postPanelAnim.start()
  }
  $setRating(rating) {
    this.rating = rating
    this.tag('Title')
      .tag('Rating')
      .patch({
        text: { text: rating },
      })
  }
  // create a session to be able to post data
  _firstActive() {
    this.tag('Title')
      .tag('MovieTitle')
      .patch({
        text: { text: this.fireAncestors('$getTitle') },
      })
    this.$authenticate()
  }
  $authenticate() {
    createGuestSession()
  }
  //pass in movie id and rating
  $postData(rating) {
    postMovieRating(this.postMovieId, rating).then(this.handleClosePostPanel())
  }
  _handleUp() {
    this._setState('ClosePost')
  }
  handleClosePostPanel() {
    this.fireAncestors('$passClosePanel')
  }

  _getFocused() {
    return this.tag('StarRatingList')
  }
  static _states() {
    return [
      class ClosePost extends MovieButton {
        $enter() {
          this.tag('Post').tag('StarRatingList').alpha = 0.6
        }
        _getFocused() {
          return this.tag('Back')
        }
        _handleEnter() {
          this.handleClosePostPanel()
        }
        _handleDown() {
          this._setState('RatingPanel')
        }
        _handleRight() {
          this._setState('RatingPanel')
        }
      },
      class RatingPanel extends this {
        $enter() {
          this.tag('Post').tag('StarRatingList').alpha = 1
        }
      },
    ]
  }
}
