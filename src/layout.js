import prodAssets from '../webpack-assets.json'
import devAssets from '../webpack-assets.dev.json'


// we change assets file on production
let assets
if (process.env.NODE_ENV != 'production') {
  assets = devAssets
} else {
  assets = prodAssets
}

export default  `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>SimplePass password manager</title>
        <meta name="description" content="SimplePass, the opensource password manager" />
        <meta name="author" content="Fenykepy" />
        <meta charset="utf-8" />
        <link rel="icon" type="image/png" href="/static/images/favicon.png?v=2" />
        <link rel="stylesheet" href="${assets.app.css}" />
      </head>
      <body>
        <div id="root"></div>
        <script src="${assets.app.js}"></script>
      </body>
    </html>
    `
