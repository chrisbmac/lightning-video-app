import { Lightning } from '@lightningjs/sdk'
import { Grid } from '@lightningjs/ui'
import KeyBoardButton from './KeyBoardButton'
import {
  Alpha_Chars,
  LowerCase_Chars,
  Special_Chars,
  ExecKeys,
  mergeKeyTypes,
  Numbers,
  ShiftToSpecials,
  ShiftFromSpecials,
  ShiftToUpperCase,
  ShiftFromUpperCase,
} from './KeyBoardCharacters'
import { gridBuilderAdd } from './KeyBoardGridBuilder'
import { Yellow } from '../../Helpers/AppColors'

export default class KeyBoardGridList extends Lightning.Component {
  static _template() {
    const grid_w = 1740
    const grid_h = 850
    const grid_spacing = 30
    return {
      UpperGrid: {
        zIndex: 1,
        visible: true,
        w: grid_w,
        h: grid_h,
        spacing: grid_spacing,
        rows: 4,
        columns: 10,
        itemType: KeyBoardButton,
        type: Grid,
      },
      LowerGrid: {
        zIndex: 1,
        visible: false,
        w: grid_w,
        h: grid_h,
        spacing: grid_spacing,
        rows: 4,
        columns: 10,
        itemType: KeyBoardButton,
        type: Grid,
      },
      SpecialsGrid: {
        zIndex: 1,
        visible: false,
        w: grid_w,
        h: grid_h,
        spacing: grid_spacing,
        rows: 3,
        columns: 10,
        itemType: KeyBoardButton,
        type: Grid,
      },
      BG: {
        zIndex: 0,
        y: -20,
        x: -22.5,
        texture: Lightning.Tools.getRoundRect(860, 400, 0, 0.5, Yellow, true, 0xff000000),
      },
      grid_alpha_textColor: 0xffdedede,
    }
  }

  get upperGrid() {
    return this.tag('UpperGrid')
  }
  get lowerGrid() {
    return this.tag('LowerGrid')
  }
  get specialGrid() {
    return this.tag('SpecialsGrid')
  }
  _setup() {
    // upper case
    gridBuilderAdd(
      this.upperGrid,
      mergeKeyTypes(Numbers, Alpha_Chars),
      50,
      50,
      35,
      this.grid_alpha_textColor,
      'center'
    )
    this.upperGrid.addAt(
      {
        w: 70,
        h: 50,
        Text: {
          text: {
            text: ShiftFromUpperCase,
            textColor: this.grid_alpha_textColor,
            textAlign: 'center',
            fontSize: 30,
          },
        },
      },
      this.upperGrid.length
    )
    this.upperGrid.addAt(
      {
        w: 50,
        h: 50,
        Text: {
          text: {
            text: ShiftToSpecials,
            textColor: this.grid_alpha_textColor,
            textAlign: 'center',
            fontSize: 30,
          },
        },
      },
      this.upperGrid.length
    )
    this.upperGrid.addAt(
      ExecKeys.map(char => {
        let w = 250
        let x = 0
        let txtX = 0
        if (char === 'Del') {
          w = 60
          x = 0
          txtX = 0
        } else {
          w = 250
          x = 180
          txtX = 80
        }
        return {
          w: w,
          h: 50,
          x: x,
          Text: {
            x: txtX,
            text: {
              text: char,
              textColor: this.grid_alpha_textColor,
              textAlign: 'center',
              fontSize: 30,
            },
          },
        }
      }),
      this.upperGrid.length
    )
    // lower case
    gridBuilderAdd(
      this.lowerGrid,
      mergeKeyTypes(Numbers, LowerCase_Chars),
      50,
      50,
      35,
      this.grid_alpha_textColor,
      'center'
    )
    this.lowerGrid.addAt(
      {
        w: 70,
        h: 50,
        Text: {
          text: {
            text: ShiftToUpperCase,
            textColor: this.grid_alpha_textColor,
            textAlign: 'center',
            fontSize: 30,
          },
        },
      },
      this.lowerGrid.length
    )
    this.lowerGrid.addAt(
      {
        w: 50,
        h: 50,
        Text: {
          text: {
            text: ShiftToSpecials,
            textColor: this.grid_alpha_textColor,
            textAlign: 'center',
            fontSize: 30,
          },
        },
      },
      this.lowerGrid.length
    )
    this.lowerGrid.addAt(
      ExecKeys.map(char => {
        let w = 250
        let x = 0
        let txtX = 0
        if (char === 'Del') {
          w = 60
          x = 0
          txtX = 0
        } else {
          w = 250
          x = 180
          txtX = 80
        }
        return {
          w: w,
          h: 50,
          x: x,
          Text: {
            x: txtX,
            text: {
              text: char,
              textColor: this.grid_alpha_textColor,
              textAlign: 'center',
              fontSize: 30,
            },
          },
        }
      }),
      this.lowerGrid.length
    )

    // specials
    gridBuilderAdd(
      this.specialGrid,
      mergeKeyTypes(Numbers, Special_Chars),
      50,
      50,
      35,
      this.grid_alpha_textColor,
      'center'
    )
    this.specialGrid.addAt(
      {
        w: 70,
        h: 50,
        Text: {
          text: {
            text: ShiftFromSpecials,
            textColor: this.grid_alpha_textColor,
            textAlign: 'center',
            fontSize: 30,
          },
        },
      },
      this.specialGrid.length
    )
    this.specialGrid.addAt(
      ExecKeys.map(char => {
        let w = 250
        let x = 0
        let txtX = 0
        if (char === 'Del') {
          w = 60
          x = 0
          txtX = 0
        } else {
          w = 250
          x = 180
          txtX = 80
        }
        return {
          w: w,
          h: 50,
          x: x,
          Text: {
            x: txtX,
            text: {
              text: char,
              textColor: this.grid_alpha_textColor,
              textAlign: 'center',
              fontSize: 30,
            },
          },
        }
      }),
      this.specialGrid.length
    )
  }
}
