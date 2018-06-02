const yargs  = require ('yargs');
const geocode = require ('./geocode/geocode');
const forecast = require('./forecast/forecast');

const argv = yargs
    .options ({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Provide an address for weather forecast',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress (argv.address, (errorMessage, results) => {
    console.log ('---');
    if (errorMessage) {
        console.log (errorMessage);
    } else {
        console.log (JSON.stringify(results, undefined, 2));
        forecast.retrieveForecast(results.location, (errorForecast, results)=> {
            if (errorForecast) {
                console.log ("Unable to Fetch Weather");
            } else {
                console.log (`The temperature is: ${results.temperature}`);
                // hourly.data[i].temperature 
                //console.log (results.hourly.data[0]);
                //console.log (`Daily has ${results.daily.data.length} forecasts`);
                
                var dailyHigh = results.daily.data.map( (day) => (day.temperatureHigh));
                var dailyLow  = results.daily.data.map ( (day) => (day.temperatureLow));
                console.log (dailyHigh);
                console.log (dailyLow);
                
            }
        });
    }
    console.log ('---');
});


