import { Lightning } from '@lightningjs/sdk'
import SideBarList from './SideBarList'

export default class Panel extends Lightning.Component {
  static _template() {
    return {
      SideBar: {
        x: 20,
        y: 300,
        RoundRectangle: {
          zIndex: 10,
          texture: Lightning.Tools.getRoundRect(70, 200, 4, 3, 0xff000000, true, 0xff000000),
          alpha: 0.5,
        },
        List: { type: SideBarList },
      },
    }
  }
  _getFocused() {
    return this.tag('SideBar').tag('List')
  }
}
