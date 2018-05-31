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
        forecast.retrieveForecast(results.location, ()=> {
            console.log ("weather forecast retrieved");
        });
    }
    console.log ('---');
});


