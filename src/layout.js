
import webpackAssets from '../webpack-assets.json'

export default  `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>SimplePass password manager</title>
        <meta name="description" content="SimplePass, the opensource password manager" />
        <meta name="author" content="Fenykepy" />
        <meta charset="utf-8" />
        <link rel="icon" type="image/png" href="/static/images/favicon.png?v=2" />
        <link rel="stylesheet" href="${webpackAssets.app.css}" />
      </head>
      <body>
        <div id="root"></div>
        <script src="${webpackAssets.app.js}"></script>
      </body>
    </html>
    `
