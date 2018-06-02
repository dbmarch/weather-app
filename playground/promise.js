var asyncAdd = (a,b) => {
    return new Promise ((resolve,reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve (a+b);
            } else {
                reject ('NaN');
            }
        }, 1000);
    })
}

asyncAdd(45,3).then ((res) => {
    console.log('Result: ', res);
}, (errorMessage) => {
    console.log (errorMessage);
});


asyncAdd(10,20).then ((res) => {
    console.log('Result: ', res);
    return asyncAdd(res,30);
}).then ((res) => {
    console.log ('Result2: ', res);
}).catch((errorMessage) => {
    console.log (errorMessage);
});



// var somePromise = new Promise ((resolve, reject) => {
//     setTimeout(() => {
//          resolve ('Hey.  It worked!');
//          //reject('error');
//     }, 2500);
// });


// somePromise.then ( (message) => {
//     console.log ('Success: ',  message);
// }, (errorMessage) => {
//     console.log ('Error: ', errorMessage);
// });