var BASE_URI = "http://localhost:8000"; //DO NOT INCLUDE SUFFIX '/'
var express = require('express');
var router = express.Router();
var db = require('../model/db');
var dateFormat = require('dateformat');
var http = require('http');
var nodemailer = require('nodemailer');
var parseString = require('xml2js').parseString;

var transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vit.pevrc.library@gmail.com',
        pass: 'centraLLibrary'
    }
});

var result;
var resObj;
//var eventGCal=require('../bin/quickstart');


router.get(/\/[\d]{18}[\/]?$/, function(req, res, next) {
    resObj = res;
    var uniq = req.originalUrl.substring(14, 32);

    db.connect();
    db.isPresentByTime(uniq, function(yesPresent) {
        console.log(yesPresent);
        if (yesPresent == true) {
            var title = "Reservation confirmed";
            var message = "Your reservation is confirmed! A cancellation link has been sent to your email address to cancel your reservation.";
            db.connect();
            db.retrieveTemp(uniq, function(data) {
                if (data === true) { //If the user clicks an already confirmed event
                    //console.log("data true");
                    render(title, message);
                    return;
                } else if (data === false) { //If the user clicks an already deleted event
                    //console.log("data false");
                    title = "Reservation failed"
                    message = "There was a problem processing your reservation or you have deleted it already, please try again."
                    render(title, message);
                    return;
                }

                //console.log(JSON.stringify(data[0]));
                result = JSON.parse(data[0]["data"]);
                db.close();

                /*
        If using Google Calendar, use the below code:
        var date=new Date(Date.parse(result.date.substring(4)));
        date.setHours(parseInt(Number(result.from))/2);
        var event = {
            'summary': result.purpose+" || "+result.name,
            'description': result.email+" || No. Audience: "+result.no_aud+" || Type:"+result.type+" || Guest:"+result.guest_name,
            'start': {
                'dateTime': formatLocalDate(date),
                //'timeZone': 'Asia/Kolkata',
            },
            'reminders': {
                'useDefault': false,
                'overrides': [
                {'method': 'email', 'minutes': 2 * 60},
                {'method': 'popup', 'minutes': 10},
                ],
            },
        };
        console.log(JSON.stringify(event));
        eventGCal(event);
        */

                var summary = encodeURI(result.purpose + " || " + result.name);
                var notes = encodeURI(result.email + " || No. Audience: " + result.no_aud + " || Type:" + result.type + " || Guest:" + result.guest_name);
                var dateStart = encodeURI(result.date.substring(4));

                var date = new Date(Date.parse(result.date.substring(4)));
                date.setHours(parseInt(Number(result.from)) / 2);
                var str = dateFormat(date, "h:MMtt");
                var timeStart = str;

                var reminder = 7200;

                var URI = "http://30boxes.com/api/api.php?method=events.AddByElements&apiKey=8503859-69f23bf163ae910738b4f09bb1ff808c&authorizedUserToken=\"API_KEY\"&summary=" + summary + "&notes=" + notes + "&dateStart=" + dateStart + "&timeStart=" + timeStart + "&reminder=" + reminder;

                var eventid;

                http.get(URI, function(res) {
                    console.log("Got response: " + res.statusCode);
                    var resString = "";
                    res.on("data", function(data) {
                        resString += data.toString();
                    });
                    res.on("end", function() {
                        parseString(resString, function(err, myResult) {

                            eventid = myResult.rsp.eventList[0].event[0].id[0];

                            //console.log(eventid);
                            //console.log(result);
                            //console.log(uniq);

                            db.connect();
                            db.deleteTemp(uniq);
                            db.close();

                            db.connect();
                            db.save(result, uniq, eventid);
                            db.close();

                        });
                    });
                }).on('error', function(e) {
                    console.log("Got error: " + e.message);
                });

                var mailOptions = {
                    from: 'VIT Periyar EVR Central Library <vit.pevrc.library@gmail.com>',
                    to: result.email,
                    subject: 'Cancellation link',
                    html: 'Dear Sir/Madam,<p style="text-indent: 5em;">Please <b><a href=' + BASE_URI + '/cancellation/' + uniq + '>click here</b> to <u>cancel</u> your booking reservation.</p>'
                };

                transport.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Message sent: ' + info.response);
                    }
                });

                render(title, message);

            });
        } else {
            render("Reservation failed", "The time slots requested are already reserved and currently not available.");
        }
    });

});

function formatLocalDate(date) {
    var now = date,
        tzo = -now.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num) {
            var norm = Math.abs(Math.floor(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()) + 'T' + pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds()) + dif + pad(tzo / 60) + ':' + pad(tzo % 60);
}

function xml2json(xml) {
    try {
        var obj = {};
        if (xml.children.length > 0) {
            for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var nodeName = item.nodeName;

                if (typeof(obj[nodeName]) == "undefined") {
                    obj[nodeName] = xml2json(item);
                } else {
                    if (typeof(obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];

                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xml2json(item));
                }
            }
        } else {
            obj = xml.textContent;
        }
        return obj;
    } catch (e) {
        console.log(e.message);
    }
}

var render = function(title, message) {
    resObj.render('confirmation', {
        title: title,
        message: message
    });
}

module.exports = router;