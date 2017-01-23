var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
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

app.get('/click', function (req, res) {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
  res.send(
    `<html>
      <head></head>
      <body>
        <p>${req.headers['referer']}</p>
        <a href="http://echo-referer.herokuapp.com/click/?b" target="_blank">CLICK ME</a>
      </body>
    </html>`
  )
})

app.listen(process.env.PORT || 9987, function () {
  console.log('Example app listening on port process.env.PORT || 9987!')
})
