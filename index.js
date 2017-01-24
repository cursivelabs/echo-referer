var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
  res.send(
    `var p = document.createElement('p')
     p.innerText = 'HEADER REFERER: ${req.headers['referer']}'
     document.body.appendChild(p)

     var p2 = document.createElement('p')
     p2.innerText = 'JAVASCRIPT REFERER: ' + document.referrer
     document.body.appendChild(p2)

     var a = document.createElement('a')
     a.target = '_blank'
     a.href = 'http://echo-referer.herokuapp.com/click'
     a.innerHTML = 'click this link to see if a header is sent in the request'
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
        <p>HEADER REFERER from link click ${req.headers['referer']}</p>
        <a href="http://echo-referer.herokuapp.com/click/?b" target="_blank">click this link to see if a header is sent in the request</a>
      </body>
    </html>`
  )
})

app.listen(process.env.PORT || 9987, function () {
  console.log('Example app listening on port process.env.PORT || 9987!')
})
