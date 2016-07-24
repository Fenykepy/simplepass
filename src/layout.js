
import webpackAssets from '../webpack-assets.json'

export default  `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>SimplePass password manager</title>
        <meta name="description" content="SimplePass, the opensource password manager" />
        <meta name="author" content="Fenykepy" />
        <meta charset="utf-8" />
        <link rel="icon" type="image/svg" href="/public/images/phiroom-favicon.svg" />
      </head>
      <body>
        <div id="root"></div>
        <script src="${webpackAssets.app.js}"></script>
      </body>
    </html>
    `
