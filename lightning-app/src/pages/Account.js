import { Lightning } from '@lightningjs/sdk'

export default class Account extends Lightning.Component {
  static _template() {
    return {
      text: { text: 'ACCOUNT', textColor: 0xff000000 },
    }
  }
}
