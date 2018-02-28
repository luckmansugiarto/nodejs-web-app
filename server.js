const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000

var app = express()

hbs.registerPartials(path.join(__dirname, '/views/layouts'))
app.set('view engine', 'hbs')
// __dirname refer to the root path of the project
app.use(express.static(path.join(__dirname, '/public')))

app.use((request, response, next) => {
  var now = new Date().toString()
  var log = now + ': ' + request.method + ' ' + request.url

  fs.appendFile('server.log', log + '\n')
  next()
})

// app.use((request, response, next) => {
//   response.render('maintenance.hbs', {
//     pageTitle: 'Sorry!'
//   })
// })

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'My Home Page',
    name: 'Luckman',
    like: [
      'Fanie',
      'Food',
      'Jesus'
    ]
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
