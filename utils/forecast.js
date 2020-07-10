const request = require('request')

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1bd8d0045e9e84c2792ee6079c46de9b&query=${lat},${long}&units=f`

  request({url, json: true}, (err, {body}) => {
    if(err) {
      callback('Unable to connect to weather service')
    } else if (body.error) {
      callback('Unable to find location')
    } else {
      const data = body.current
      callback(undefined, `${data.weather_descriptions[0]}. It is currently ${data.temperature} degrees out. It feels like ${data.feelslike} degrees out.`)
    }
  })
}

module.exports = forecast