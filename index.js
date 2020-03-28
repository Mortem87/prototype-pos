'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var db = 'bulkana-pos';
var port = process.env.PORT || 3977;
//mongoose.connect('url', { useNewUrlParser: true }, (err, res)
mongoose.connect('mongodb://localhost:27017/' + db, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) =>{
    if(err){
        throw err;
    }else{
        console.log('La base de datos ' + db + ' está en funcionamiento.');

        app.listen(port, function(){
            console.log('Servidor del api rest del punto de venta escuchando en http://localhost:' + port);
        });
    }
});