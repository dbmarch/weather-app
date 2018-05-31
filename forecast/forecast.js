
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

    console.log (newURL);

    var cb_data = { 
        error : undefined,
        results:  {}
    };

    request ({
        url: newURL,
        json: true
    } , (error, response, body) => {
        //console.log (JSON.stringify(body, undefined, 2));

        console.log (JSON.stringify(body.currently, undefined,2));
    }
);     
}

module.exports = {
    retrieveForecast 
};


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