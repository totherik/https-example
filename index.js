'use strict';

var http = require('http');
var https = require('https');
var express = require('express');
var kraken = require('kraken-js');

var app, plain, ssl;

app = express();
app.use(kraken());
app.on('start', function () {
    ssl = https.createServer(app.kraken.get('tls'), app);
    ssl.listen(8443, function () {
        console.log('HTTPS Server listening on port', ssl.address().port);
    });
});

plain = http.createServer(app);
plain.listen(8000, function () {
    console.log('HTTP Server listening on port', plain.address().port);
});