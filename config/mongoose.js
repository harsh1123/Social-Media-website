const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/codeial2');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to database'));

db.once('open',function(err){
    if(err)
    {
        console.log('error connecting to database',err);
        return;
    }

    console.log('succesfully conncted to the database');
})





module.exports = db;