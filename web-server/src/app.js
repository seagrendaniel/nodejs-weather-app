const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../../utils/geocode');
const forecast = require('../../utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Dan Seagren'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Dan Seagren'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Dan Seagren',
    helpText: 'This is some helpful text'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
    if(err) {
      return res.send({err})
    }
    forecast(latitude, longitude, (err, forecastData) => {
      if(err) {
        return res.send({err})
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})


app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Help',
    name: 'Dan Seagren',
    errorMessage: 'Help article not found.'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Dan Seagren',
    errorMessage: 'Page not found'
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})