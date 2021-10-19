import { Lightning, Img, Utils, Router } from '@lightningjs/sdk'
import SideBarIcon from './SideBarIcon'

export default class SideBarList extends Lightning.Component {
  static _template() {
    return {
      Column: {
        flex: { direction: 'column' },
        Search: { type: SideBarIcon },
        Account: { type: SideBarIcon },
      },
    }
  }
  get column() {
    return this.tag('Column')
  }
  get focusedChild() {
    return this.column.children[this.index]
  }
  _init() {
    this.index = 0
    this.column
      .tag('Search')
      .tag('Image')
      .patch({
        texture: Img(Utils.asset('svgs_icons/iconsMedium/icons8-search-96.png')).exact(50, 50),
      })
    this.column
      .tag('Account')
      .tag('Image')
      .patch({
        texture: Img(Utils.asset('svgs_icons/iconsMedium/icons8-customer-96.png')).exact(50, 50),
      })
  }
  _handleUp() {
    if (this.index === 0) return
    this.index--
  }
  _handleDown() {
    if (this.index === this.children.length) return
    this.index++
  }
  _getFocused() {
    return this.tag('Column').children[this.index]
  }
  _handleEnter() {
    let path = ''
    if (this.focusedChild === 0) {
      console.log('Its search')
      path = 'search'
    } else if (this.focusedChild === 1) {
      console.log('its account')
      path = 'account'
    }
    Router.navigate(path)
  }
}
