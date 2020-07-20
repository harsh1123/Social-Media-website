const express = require('express');
const port = 8000;

const app = express();



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

