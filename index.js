var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send(
    `<html>
      <head></head>
      <body>
        <p>${req.headers['referer']}</p>
        <p><a href='http://echo-referer.herokuapp.com/click'>LINK</a></p>
      </body>
    </html>`
  )
})

app.get('/click', function (req, res) {
  res.send(
    `<html>
      <head></head>
      <body>${req.headers['referer']}</body>
    </html>`
  )
})

app.listen(process.env.PORT || 9987, function () {
  console.log('Example app listening on port process.env.PORT || 9987!')
})
