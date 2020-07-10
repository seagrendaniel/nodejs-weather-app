const request = require('request');

const url = 'http://api.weatherstack.com/current?access_key=1bd8d0045e9e84c2792ee6079c46de9b&query=37.8267,-122.4233&units=f'

request({ url: url, json: true }, (err, res) => {
  if (err) {
    console.log('Unable to connect to weather service')
  } else if (res.body.error) {
    console.log('Unable to find location')
  } else {
    const data = res.body.current
    console.log(`${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`)
  }
})

const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2VhZ3JlbmRhbmllbCIsImEiOiJja2NncWxuY3cwMnA0MndvZXQzMGRyNmM3In0.g04dpahECGR7SECyEUEvHA&limit=1'

request({ url: geocodeUrl, json: true }, (err, res) => {
  if (err) {
    console.log('Unable to connect to geocoding service')
  } else if (res.body.features.length === 0) {
    console.log('Unable to find location. Try another search.')
  } else {
    const latitude = res.body.features[0].center[1];
    const longitude = res.body.features[0].center[0];
    console.log(latitude, longitude);
  }
})