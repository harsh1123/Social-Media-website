const express = require('express');
const port = 8000;

const app = express();
const expressLayout = require('express-ejs-layouts');


app.use(express.static('assets'));
app.use(expressLayout);
app.set('layout extractStyle',true);
app.set('layout extractScripts',true);

app.use('/',require('./routes/index'));

app.set('view engine','ejs');
app.set('views','./views');





app.listen(port,function(err)
{
    if(err)
    {
        console.log(err);
        return;
    }
    

    console.log('server is running on port:',port);

});

