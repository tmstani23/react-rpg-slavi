const express = require('express')
const app = express()
const port = 3002
const bodyParser = require('body-parser');
const cors = require("cors");

// Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//cors middleware
app.use(cors());

app.use(function (req, res) {
    res.setHeader('Content-Type', 'text/plain')
    res.write('you posted:\n')
    res.end(JSON.stringify(req.body, null, 4))
})

//ROUTES
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// POST /api/maps gets JSON bodies
app.post('/api/maps', jsonParser, function (req, res) {
    // create user in req.body
    console.log(req.body);
    res.send('Map Posted, ')
  })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})