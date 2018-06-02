const yargs  = require ('yargs');
const axios = require ('axios');
const credentials= require ('./credentials');

const WEATHER_KEY = credentials.WEATHER_KEY;
const API_KEY = credentials.API_KEY;
if (API_KEY === undefined || WEATHER_KEY === undefined) {
    console.log ('ERROR: UNABLE TO ACCESS API KEY');
}

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

const encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&address=${encodedAddress}`;

axios.get (geocodeUrl).then ( (response) => {
    //console.log (response.data);
    if (response.data.results.length === 0) {
        throw new Error ('Unable to find address.');
    }else if (response.status === 200) {
        const  results = {
            address:   response.data.results[0].formatted_address,
            location:  response.data.results[0].geometry.location
        };
        console.log (results.address);
        const weatherUrl = `https://api.darksky.net/forecast/${WEATHER_KEY}/${results.location.lat},${results.location.lng}`;
        return axios.get(weatherUrl);
    } else {
        throw new Error ( `Error: ${response.status}` );
    }

 }).then( (response) => {
    var results = {
        temperature: response.data.currently.temperature,
        currently: response.data.currently,
        hourly: response.data.hourly,
        daily: response.data.daily
    };
    console.log (`The temperature is: ${results.temperature}`);
    // hourly.data[i].temperature 
    //console.log (results.hourly.data[0]);
    //console.log (`Daily has ${results.daily.data.length} forecasts`);
    
    var dailyHigh = results.daily.data.map( (day) => (day.temperatureHigh));
    var dailyLow  = results.daily.data.map ( (day) => (day.temperatureLow));
    console.log ('High: ', dailyHigh);
    console.log ('Low:  ', dailyLow);
 }).catch((e) => {
     //console.log (e);
     if (e.code === 'ENOTFOUND') {
        console.log ('Unable to connect to API Server');
     } else {
         console.log ('Error: ', e.message);
     }
 });

 
