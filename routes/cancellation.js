var express = require('express');
var router = express.Router();
var db = require('../model/db');
var http = require('http');

router.get(/\/[\d]{18}[\/]?$/, function(req, res, next) {

    var uniq = req.originalUrl.substring(14, 32);

    db.connect();
    db.remove(uniq, function(eventid) {
        if (eventid === false) //If user cancels an already cancelled or non existing event
            return;

        var URI = 'http://30boxes.com/api/api.php?method=events.Delete&apiKey=8503859-69f23bf163ae910738b4f09bb1ff808c&authorizedUserToken=\"API_KEY\"&eventId=' + eventid;
        http.get(URI, function(res) {
            console.log("Got response: " + res.statusCode);
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });
        //console.log(URI);
    });
    db.close();

    res.render('confirmation', {
        title: "Reservation cancelled",
        message: "Your reservation is cancelled."
    });

});

module.exports = router;