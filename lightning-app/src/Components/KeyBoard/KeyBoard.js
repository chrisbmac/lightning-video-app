import { Lightning } from '@lightningjs/sdk'
import KeyBoardOutput from './KeyBoardOutput'
import KeyBoardGridList from './KeyBoardGridList'
import {
  ShiftToSpecials,
  ShiftFromSpecials,
  ShiftToUpperCase,
  ShiftFromUpperCase,
} from './KeyBoardCharacters'
export default class KeyBoard extends Lightning.Component {
  static _template() {
    return {
      flex: { direction: 'row', flexWrap: true },
      KeyBoardOutput: { x: 550, y: 300, type: KeyBoardOutput },
      KeyBoardGridList: { x: 500, y: 400, type: KeyBoardGridList },
      BG: { zIndex: -1, alpha: 0.6, rect: true, w: 1920, h: 1080, x: 0, y: 0, color: 0xff000000 },
      charCase: true,
    }
  }
  _active() {
    const myKBAnim = this.animation({
      duration: 0.5,
      repeat: 0,
      stopMethod: 'immediate',
      actions: [{ p: 'alpha', v: { 0: 0, 1: 1 } }],
    })
    myKBAnim.start()
  }
  _init() {
    this.gridIndex = 0
    this.previousGridIndex = 0
  }
  _getFocused() {
    return this.kbGridList.children[this.gridIndex]
  }
  // create a signal (kbOnEnter) for parent to handle closing keyboard and using value
  $handleKeyPress(value) {
    if (value === 'Enter') {
      this.signal('kbOnEnter', this.kbOutput.text)
    } else if (value === 'Del') {
      this.delete()
    } else if (value === 'Space') {
      this.addSpace()
    } else if (value === ShiftFromUpperCase || value === ShiftToUpperCase) {
      this.changeCaps()
    } else if (value === ShiftToSpecials) {
      this.changeSpecials()
    } else if (value === ShiftFromSpecials) {
      this.changeFromSpecials()
    } else {
      this.kbOutput.setText = value
    }
  }
  delete() {
    let slice = this.kbOutput.text
    if (!slice || slice.length === 0) return
    this.kbOutput.tag('Text').patch({ text: { text: slice.slice(0, -1) } })
  }
  addSpace() {
    this.kbOutput.setText = ' '
  }
  changeFromSpecials() {
    this.gridIndex = this.previousGridIndex
    this.kbGridList.children[this.previousGridIndex].visible = !this.kbGridList.children[
      this.previousGridIndex
    ].visible
    this.kbGridList.children[2].visible = !this.kbGridList.children[2].visible
  }
  // change to special characters
  changeSpecials() {
    this.previousGridIndex = this.gridIndex
    const SpecialsGridIndex = 2
    this.gridIndex = SpecialsGridIndex
    this.kbGridList.children[this.previousGridIndex].visible = !this.kbGridList.children[
      this.previousGridIndex
    ].visible
    this.kbGridList.children[SpecialsGridIndex].visible = !this.kbGridList.children[
      SpecialsGridIndex
    ].visible
  }
  // change alpha characters caps
  changeCaps() {
    this.previousGridIndex = this.gridIndex
    if (this.gridIndex === 0) {
      this.gridIndex = 1
    } else if (this.gridIndex === 1) {
      this.gridIndex = 0
    }
    this.kbGridList.children[this.previousGridIndex].visible = false
    this.kbGridList.children[this.gridIndex].visible = true
  }
  set setGridIndex(index) {
    this.gridIndex = index
  }
  get kbGridList() {
    return this.tag('KeyBoardGridList')
  }
  get kbOutput() {
    return this.tag('KeyBoardOutput')
  }
  set setKbOutput(value) {
    this.kbOutput.tag('Text').patch({ text: { text: value } })
  }
}
