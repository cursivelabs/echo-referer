var express = require('express')
var noCache = require('connect-nocache')(
var app = express()

app.get('/', noCache, function (req, res) {
  res.send(
    `var p = document.createElement('p')
     p.innerText = 'REFERER: ${req.headers['referer']}'
     document.body.appendChild(p)

     var a = document.createElement('a')
     a.target = '_blank'
     a.href = 'http://echo-referer.herokuapp.com/click'
     a.innerHTML = 'LINK'
     document.body.appendChild(a)
    `
  )
})

app.get('/click', noCache, function (req, res) {
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
