var BASE_URI = "http://localhost:8000"; //DO NOT INCLUDE SUFFIX '/'
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(8000);
var db = require('./model/db');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var confirmation = require('./routes/confirmation');
var cancellation = require('./routes/cancellation');
var users = require('./routes/users');
var htmlEmail = require('./views/htmlEmail');
var nodemailer = require('nodemailer');
var ldap = require('./bin/ldap');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vit.pevrc.library@gmail.com',
        pass: 'centraLLibrary'
    }
});

io.on('connection', function(socket) {
    var date = new Date();
    socket.emit('date', date.toString());
    socket.on('getFilledStatus', function(date) {
        if (date) {
            db.connect();
            db.retrieveFilledStatus(date.date, function(data) {
                //console.log(data);
                socket.emit('sendFilledStatus', data);
            });
            db.close();
        }
    });
    socket.on('submitted', function(data) {
        ldap(data.email, function(existsBoolean) {
            //existsBoolean = true; //Remove this!
            if (existsBoolean === true) {
                db.connect();
                var rand = Math.floor(Math.random() * 90000) + 10000; //Generating a 5 digit random number
                var uniq = new Date().valueOf() + "" + rand; //Append a 13 digit UNIX time epoch before the random no. to get an almost truly unique random number.
                //WARNING: Possible error, the time epoch may in the future after a few centuries may increase by a digit :P

                console.log(BASE_URI + "/confirmation/" + uniq);
                //console.log((""+uniq).length);
                db.saveTemp(uniq, data);

                var fromInHours = toIST(data.from);
                var toInHours = toIST(data.to);
                toInHours = (toInHours === '2400 Hours (IST)') ? 'Midnight' : toInHours;

                var mailOptions = {
                    from: 'VIT Periyar EVR Central Library <vit.pevrc.library@gmail.com>', // sender address
                    to: data.email, // list of receivers
                    subject: 'Confirm your booking', // Subject line
                    //text: ' // plaintext body
                    html: htmlEmail(data.date, fromInHours, toInHours, data.name, data.id, data.email, data.school, data.purpose, data.key_benefits, data.no_aud, data.type, uniq)
                };
                //console.log("Hurray");
                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Message sent: ' + info.response);
                    }
                });
                socket.emit('submittedStatus', true)
                db.close();
            } else {
                socket.emit('invalidEmail');
            }
        })
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/confirmation', confirmation);
app.use('/cancellation', cancellation);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
/*if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}*/
// production error handler
// no stacktraces leaked to user

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

function formatToTwoDigitNumbers(n) {
    return n > 9 ? "" + n : "0" + n;
}

function toIST(num) {
    return (num % 2 == 0) ? formatToTwoDigitNumbers(num / 2) + "00 Hours (IST)" : formatToTwoDigitNumbers(parseInt(num / 2)) + "30 Hours (IST)"
}

module.exports = app;