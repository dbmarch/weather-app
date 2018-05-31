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

var geocodeAddress = (address, callback) => {
    
    console.log (`geocodeAddress: ${address}`);
    const encodedAddress = encodeURIComponent(address);
    const newURL = URL_Base+encodedAddress;
    var cb_data = { 
        error : undefined,
        results:  {}
    };

    request ({
        url: newURL,
        json: true
    } , (error, response, body) => {
        //console.log (JSON.stringify(response));
        if (error) {
            cb_data.error = 'Unable to connect to Google Service';
        } else if (response.statusCode === 200) {
            if( body.results.length === 0) {
                cb_data.error ='NO RESULTS FOUND';
            } else if (body.results[0] === undefined) {
                cb_data.error = "Received an undefined response with an OK";
                console.log (JSON.stringify(response, undefined, 2));
            }
            else {
                cb_data.results.address =  body.results[0].formatted_address;
                //console.log (`Lat: ${body.results[0].geometry.location.lat}   Long: ${body.results[0].geometry.location.lng}`);
                cb_data.results.location =  body.results[0].geometry.location;
            }

        } else {
            cb_data.error = 'Unknown error';
            //console.log (JSON.stringify(error));
        }   
        callback (cb_data.error, cb_data.results);
        //console.log (JSON.stringify(location));
        //console.log (JSON.stringify(body.results[0], undefined, 2));
    });
}

module.exports = {
    geocodeAddress 
};
