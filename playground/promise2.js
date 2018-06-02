const request = require ('request');
const credentials= require ('../credentials');

const API_KEY = credentials.API_KEY;
// In the credentials.js add the line:
//module.exports.API_KEY = "<Your Google Key";
// Get one here: https://console.developers.google.com/apis/credentials
if (API_KEY === undefined) {
    console.log ('ERROR: UNABLE TO ACCESS API KEY');
}

const URL_Base = `https://maps.googleapis.com/maps/api/geocode/json?key=${API_KEY}&address=`;

var geocodeAddress = (address) => {
    
    //console.log (`geocodeAddress: ${address}`);
    const encodedAddress = encodeURIComponent(address);
    const newURL = URL_Base+encodedAddress;
    
    return new Promise ( (resolve, reject) => {
        request ({
            url: newURL,
            json: true
        } , (error, response, body) => {
            //console.log (JSON.stringify(response));
            if (error) {
                reject ('Unable to connect to Google Service');
            } else if (response.statusCode === 200) {
                if( body.results.length === 0) {
                    reject ('NO RESULTS FOUND');
                } else if (body.results[0] === undefined) {
                    reject ( "Received an undefined response with an OK");
                    console.log (JSON.stringify(response, undefined, 2));
                }
                else {
                    resolve ( {
                        address: body.results[0].formatted_address,
                        location: body.results[0].geometry.location    
                    });
                }
            } else {
                reject (  'Unknown error');
            }
    });
 });
}


geocodeAddress ('19146').then((location) => {
    console.log (JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});