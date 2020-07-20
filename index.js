const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal =require('./config/passport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('assets'));
app.use(expressLayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:'Codeial',
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }

}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/',require('./routes/index'));




app.listen(port,function(err)
{
    if(err)
    {
        console.log(err);
        return;
    }
    

    console.log('server is running on port:',port);

});

