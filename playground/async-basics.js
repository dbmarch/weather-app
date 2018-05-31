console.log ('starting app');

setTimeout( () => {
    console.log ('timeout!')
}, 2000); // 2000 msec

setTimeout ( () => {
    console.log ( 'tiny timeout')
}, 0); // 0 msec

console.log ('finishing up');

