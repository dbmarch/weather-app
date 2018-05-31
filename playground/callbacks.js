var getUser = (id, callback) => {
    var user= {
        name: 'dave',
        id:   id
    };
    setTimeout(() => {
        callback(user)
    }, 3000);
};


getUser(31, (userObj) => {
   console.log (userObj);
});

