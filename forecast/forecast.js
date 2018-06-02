
const request = require ('request');
const credentials= require ('../credentials');
const URL_Base = 'https://api.darksky.net/forecast';

const WEATHER_KEY = credentials.WEATHER_KEY;
// In the credentials.js add the line:
//module.exports.WEATHER_KEY = "<Your API.Forecast.io Key";
// Get one here: https://api.forecast.io
if (WEATHER_KEY === undefined) {
    console.log ('ERROR: UNABLE TO ACCESS WEATHER API KEY');
}

const retrieveForecast = (location, callback) => {
    console.log (`retrieveForecast: ${location}`);
    const newURL = `${URL_Base}/${WEATHER_KEY}/${location.lat},${location.lng}`;
  //    console.log (newURL);
    var cb_data = { 
        error : undefined,
        results:  {}
    };

    request ({
        url: newURL,
        json: true
    } , (error, response, body) => {
        //console.log (JSON.stringify(body, undefined, 2));
        if (!error && response.statusCode === 200 ) {
            cb_data.results = {
                temperature: body.currently.temperature,
                currently: body.currently,
                hourly: body.hourly,
                daily: body.daily
            };
            //console.log (JSON.stringify(body.currently, undefined,2));
            //console.log (body.currently.temperature);
        } else {
            cb_data.error = 'Unable to fetch weather';
        }
        callback(cb_data.error, cb_data.results);
    }
);     
}

module.exports = {
    retrieveForecast 
};


// This is the data.
// It is available as 
// {
//     latitude: 37.8267,
//     longitude: -122.4233,
//     timezone: "America/Los_Angeles",
//     
//     currently: {
//     time: 1527739254,
//     summary: "Clear",
//     icon: "clear-night",
//     nearestStormDistance: 24,
//     nearestStormBearing: 78,
//     precipIntensity: 0,
//     precipProbability: 0,
//     temperature: 54.64,
//     apparentTemperature: 54.64,
//     dewPoint: 45.42,
//     humidity: 0.71,
//     pressure: 1011.83,
//     windSpeed: 15.48,
//     windGust: 18.9,
//     windBearing: 255,
//     cloudCover: 0.24,
//     uvIndex: 0,
//     visibility: 9.44,
//     ozone: 361.2
//     },
//     minutely: {
//     summary: "Clear for the hour.",
//     icon: "clear-night",
//     data: []
//     },
//     hourly: {
//     summary: "Partly cloudy starting tonight, continuing until tomorrow afternoon, and breezy tonight.",
//     icon: "wind",
//     data: []
//     },
//     daily: {
//     summary: "No precipitation throughout the week, with high temperatures rising to 72°F on Sunday.",
//     icon: "clear-day",
//     data: []
//     },

// Under Data in each section ( in an array :)
// time: 1527850800,
// summary: "Clear",
// icon: "clear-night",
// precipIntensity: 0,
// precipProbability: 0,
// temperature: 50.98,
// apparentTemperature: 50.98,
// dewPoint: 45.9,
// humidity: 0.83,
// pressure: 1016.82,
// windSpeed: 5.86,
// windGust: 6.82,
// windBearing: 292,
// cloudCover: 0.19,
// uvIndex: 0,
// visibility: 10,
// ozone: 327.68