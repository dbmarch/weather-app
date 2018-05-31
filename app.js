const request = require ('request');
const yargs  = require ('yargs');
const credentials= require ('./credentials');

const API_KEY = credentials.API_KEY;

// In the credentials.js add the line:
//module.exports.API_KEY = "<Your Google Key";
// Get one here: https://console.developers.google.com/apis/credentials

if (API_KEY === undefined) {
    console.log ('ERROR: UNABLE TO ACCESS API KEY');
}

const URL_Base = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&address=`;

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

//console.log (argv);

const encodedAddr = encodeURIComponent(argv.a);
//console.log(encodedAddr);

const newURL =  URL_Base+encodedAddr;
//console.log (newURL);

request ({
    url: newURL,
    json: true
} , (error, response, body) => {
    //console.log (JSON.stringify(response));
    if (error) {
        console.log ('Unable to connect to Google Service');
    } else if (response.statusCode === 200) {
        if( body.results.length === 0) {
            console.log ('NO RESULTS FOUND');
        } else if (body.results[0] === undefined) {
            console.log ("Received an undefined response with an OK");
            console.log (JSON.stringify(response, undefined, 2));
        }
        else {
            console.log (`Address: ${body.results[0].formatted_address}`);
            console.log (`Lat: ${body.results[0].geometry.location.lat}   Long: ${body.results[0].geometry.location.lng}`);

            const location = body.results[0].geometry.location;
        }

    } else {
        console.log ('Unknown error');
        console.log (JSON.stringify(error));
    }   
    //console.log (JSON.stringify(location));

    //console.log (JSON.stringify(body.results[0], undefined, 2));
});

