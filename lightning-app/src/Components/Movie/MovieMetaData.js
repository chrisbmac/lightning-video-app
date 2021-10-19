import { Lightning, Img, Utils } from '@lightningjs/sdk'
export default class MovieMetaData extends Lightning.Component {
  static _template() {
    const xAxis = 280
    const fontColor = 0xffb8b8b8
    return {
      MovieTitle: {
        x: xAxis,
        y: 220,
        mountY: 0.4,
        text: { text: 'Movie Page' },
      },
      ReleaseDate: {
        x: xAxis,
        y: 250,
        text: { text: 'Release Date', fontSize: 20, fontWeight: 'bold' },
      },
      MovieLength: {
        x: xAxis,
        y: 300,
        color: fontColor,
        text: { text: 'length', fontSize: 20 },
      },
      PGRating: {
        x: 400,
        y: 303,
        texture: Lightning.Tools.getRoundRect(80, 20, 4),
        color: 0xff1f1f1f,
        Label: {
          y: 0,
          x: 15,
          color: fontColor,
          text: { text: 'PG-13', fontSize: 18 },
        },
      },
      MovieRating: {
        x: 500,
        y: 300,
        color: fontColor,
        text: { text: 'Movie Rating', fontSize: 20 },
        Image: {
          x: 60,
          y: -11.5,
          texture: Img(Utils.asset('/svgs_icons/icons8-imdb-48.png')).original(),
        },
      },
    }
  }
}
