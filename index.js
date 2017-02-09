var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
  console.log(req.path)
  console.log(req.headers)
  res.send(
    `var p = top.document.createElement('p')
     p.innerText = 'HTTP header referer from a friendly iframe: ${req.headers['referer']}'
     top.document.body.appendChild(p)

     var p2 = top.document.createElement('p')
     p2.innerText = 'document.referrer from inside of a friendly iframe: ' + document.referrer
     top.document.body.appendChild(p2)

     var a = document.createElement('a')
     a.target = '_blank'
     a.href = 'http://echo-referer.herokuapp.com/click'
     a.innerHTML = 'click this link to see if a header is sent in the request'
     document.body.appendChild(a)
    `
  )
})

app.get('/click', function (req, res) {
  console.log(req.path)
  console.log(req.headers)
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
  res.send(
    `<html>
      <head></head>
      <body>
        <p>FRIENDLY IFRAME HEADER REFERER from link click ${req.headers['referer']}</p>
        <pre>${JSON.stringify(req.headers)}</pre>
        <a href="http://echo-referer.herokuapp.com/click/?b" target="_blank">click this link to see if a header is sent in the request</a>
      </body>
    </html>`
  )
})

app.get('/page', function (req, res) {
  console.log(req.path)
  console.log(req.headers)
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
  res.send(
    `<html>
      <head></head>
      <body>
        <p>HEADER REFERER ${req.headers['referer']}</p>
        <p>
          <script>
            var p2 = document.createElement('p')
            p2.innerText = 'JAVASCRIPT REFERER: ' + document.referrer
            document.body.appendChild(p2)
          </script>
        </p>
        <a href="http://echo-referer.herokuapp.com/click/?b" target="_blank">click this link to see if a header is sent in the request</a>
      </body>
    </html>`
  )
})

app.listen(process.env.PORT || 9987, function () {
  console.log('Example app listening on port process.env.PORT || 9987!')
})
