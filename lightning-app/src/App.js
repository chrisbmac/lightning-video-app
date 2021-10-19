import { Router } from '@lightningjs/sdk'

import routes from './routes/routes.js'

export default class App extends Router.App {
  static getFonts() {
    return [
      { family: 'concertOne', url: '../../../static/fonts/ConcertOne-Regular.ttf', descriptor: {} },
      { family: 'Roboto', url: '../../../static/fonts/Roboto-Regular.ttf', descriptor: {} },
    ]
  }

  _setup() {
    Router.startRouter(routes)
  }
}

// disable scrolling because developing for tv - obv not work for tv - dont think anyways...
window.addEventListener('scroll', function() {
  window.scrollTo(null, null)
})
