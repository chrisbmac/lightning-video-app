import { Lightning, Router, Img, Utils, Storage, Registry } from '@lightningjs/sdk'
import Logo from '../Components/Logo/logo'
import ButtonList from '../Components/Login/ButtonList'
import KeyBoard from '../Components/KeyBoard/KeyBoard'
import Welcome from '../Components/Login/Welcome'
export default class Login extends Lightning.Component {
  static _template() {
    return {
      Logo: { x: 20, y: 10, zIndex: 1, type: Logo },
      BgImage: {
        zIndex: -1,
        x: 0,
        y: 0,
        w: 1920,
        h: 1080,
        texture: Img(Utils.asset('/images/background.png')).original(),
      },
      Column: {
        x: 500,
        y: 500,
        flex: { direction: 'column' },
        Welcome: { zIndex: 1, text: { text: 'Welcome', fontColor: 0xffffffff, textAlign: 'Left' } },
        Buttons: {
          type: ButtonList,
        },
      },
      KB: { visible: false, zIndex: 4, type: KeyBoard, signals: { kbOnEnter: '_kbOnEnter' } },
      WelcomeComp: { type: Welcome, visible: false },
    }
  }
  _active() {
    this.tag('WelcomeComp').patch({ visible: false })
    const myBgAnim = this.animation({
      duration: 1,
      repeat: 0,
      stopMethod: 'immediate',
      actions: [{ p: 'alpha', v: { 0: 0, 1: 1 } }],
    })
    myBgAnim.start()
  }
  get kb() {
    return this.tag('KB')
  }
  pageTransition() {
    return 'crossfade'
  }
  _construct() {
    this.input = null
  }
  _getFocused() {
    return this.tag('Buttons')
  }
  $setStateKeyBoard(element) {
    this.input = element
    this._setState('KBoard')
  }
  $setAuthenticated(auth) {
    if (!auth) return
    Storage.set('authenticated', auth)
  }
  $navigate(path, user) {
    this.tag('WelcomeComp').welcomeText = user.fname || 'there'
    this.tag('WelcomeComp').patch({ visible: true })
    const myBgAnim = this.tag('WelcomeComp').animation({
      duration: 0.5,
      repeat: 0,
      stopMethod: 'immediate',
      actions: [
        { p: 'alpha', v: { 0: 0, 1: 1 } },
        { p: 'x', t: 'Text', v: { 0: 0, 0.5: 300, 1: 650 } },
      ],
    })
    myBgAnim.start()
    Registry.setTimeout(() => {
      Router.navigate(path)
    }, 2000)
  }
  static _states() {
    return [
      class Main extends this {},
      class KBoard extends KeyBoard {
        $enter() {
          if (this.input.text._text) this.kb.setKbOutput = this.input.text._text

          this.kb.visible = true
        }
        _getFocused() {
          return this.kb
        }
        $exit() {
          this.kb.visible = false
          this.kb.setKbOutput = ''
          this.resetIndexedKey()
        }
        // set focused keys for all grids back to zero
        resetIndexedKey() {
          const kbGrid = this.kb.tag('KeyBoardGridList')
          //set index
          kbGrid.tag('UpperGrid').setIndex(0)
          kbGrid.tag('LowerGrid').setIndex(0)
          kbGrid.tag('SpecialsGrid').setIndex(0)
          //set visible
          kbGrid.tag('UpperGrid').visible = true
          kbGrid.tag('LowerGrid').visible = false
          kbGrid.tag('SpecialsGrid').visible = false
          //set grid index
          this.kb.setGridIndex = 0
        }
        _kbOnEnter(value) {
          this.input.patch({ text: { text: value } })
          this._setState('Main')
        }
      },
    ]
  }
}
