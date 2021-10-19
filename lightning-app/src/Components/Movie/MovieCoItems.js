import { Lightning } from '@lightningjs/sdk'
export default class MovieCoItems extends Lightning.Component {
  static _template() {
    const fontColor = 0xffb8b8b8
    return {
      MovieCoInfo: {
        flex: { direction: 'column' },
        Border: {
          flexItem: { marginBottom: 30 },
          rect: true,
          texture: Lightning.Tools.getRoundRect(1000, 5, 4, null, null, true, 0xff000000),
        },
        Studios: {
          flexItem: { marginBottom: 10 },
          flex: { direction: 'row', wrap: true },
          color: fontColor,
          text: { text: 'STUDIOS', fontSize: 20 },
          StudiosItem: {
            flex: { direction: 'row' },
            Text: { text: '' },
            x: 100,
          },
        },
        Languages: {
          flexItem: { marginBottom: 10 },
          flex: { direction: 'row', wrap: true },
          color: fontColor,
          text: { text: 'AUDIO', fontSize: 20 },
          LanguagesItem: {
            flex: { direction: 'row' },
            Text: { text: '' },
            x: 100,
          },
        },
        Genres: {
          flexItem: { marginBottom: 10 },
          flex: { direction: 'row', wrap: true },
          color: fontColor,
          text: { text: 'GENRES', fontSize: 20 },
          GenresItem: {
            flex: { direction: 'row' },
            Text: { text: '' },
            x: 100,
          },
        },
      },
    }
  }

  generateInfo(gen, tag) {
    let comma = ','
    this.tag(tag).children = gen.map((elem, ind) => {
      if (ind + 1 === gen.length) comma = ''
      return {
        text: { text: `${elem.name}${comma} `, fontSize: 20 },
      }
    })
  }

  set genres(gen) {
    return this.generateInfo(gen, 'GenresItem')
  }

  // set movie supported languages
  set languages(lang) {
    return this.generateInfo(lang, 'LanguagesItem')
  }

  // set studios items
  set studios(mstudios) {
    return this.generateInfo(mstudios, 'StudiosItem')
  }
}
