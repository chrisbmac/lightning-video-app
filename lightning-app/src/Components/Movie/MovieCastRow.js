import { Lightning, Img } from '@lightningjs/sdk'
import MovieCast from './MovieCast'
import { getActorProfileImage } from '../../Helpers/Helpers'
import { Yellow } from '../../Helpers/AppColors'
export default class MovieCastRow extends Lightning.Component {
  static _template() {
    return {
      Divider: {
        alpha: 0.7,
        x: 380,
        y: 770,
        rect: true,
        texture: Lightning.Tools.getRoundRect(1000, 5, 5, null, null, true, Yellow),
      },
      Row: {
        w: 1900,
        x: 50,
        y: 800,
        flex: { direction: 'row', wrap: true },
      },
      _cast: [],
    }
  }
  _active() {
    this.buildCastRow()
  }
  _inactive() {
    this._cast = []
  }
  set cast(cast) {
    cast.cast.forEach(person => {
      if (person.order >= 10) return
      this._cast.push(person)
    })
    return this._cast
  }

  async buildCastRow() {
    if (!this._cast) return
    return (this.tag('Row').children = await Promise.all(
      this._cast.map(async person => {
        return {
          type: MovieCast,
          flexItem: { marginRight: 70 },
          flex: { direction: 'column' },
          ProfileImage: {
            texture: await Img(await getActorProfileImage(person.profile_path)).exact(100, 100),
          },
          ActorName: {
            text: { w: 115, text: person.name, fontSize: 25 },
          },
          Character: {
            text: { w: 115, text: person.character, fontSize: 18, textColor: 0xffb8b8b8 },
          },
        }
      })
    ))
  }
}
