var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send(`referer: ${req.headers['referer']}`)
})

app.listen(process.env.PORT || 9987, function () {
  console.log('Example app listening on port process.env.PORT || 9987!')
})
