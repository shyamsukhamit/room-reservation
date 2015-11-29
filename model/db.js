var mysql = require('mysql');

var con;
var db = new Object();

String.prototype.supplant = function(o) {
    return this.replace(/{([^{}]*)}/g,
        function(a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );
};

db.connect = function() {
    con = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'room'
    });
    con.connect();
}

db.saveTemp = function(uniq, post) {
    var q = "INSERT INTO `unconfirmed`(`uniq`, `data`) VALUES (" + uniq + ",'" + JSON.stringify(post) + "');";
    con.query(q, function(err, result) {
        if (err)
            console.log(err);

    });

}

db.retrieveTemp = function(uniq, callBack) {
    var send = 'SELECT `data` FROM `unconfirmed` WHERE uniq="' + uniq + '"';
    con.query(send, function(err, result) {
        //console.log("retrieveTemp");
        //console.log(result[0]);
        if (result[0] !== undefined) {
            callBack(result);
        } else {
            db.close();
            db.connect();
            db.isPresent(uniq, function(bool) {
                callBack(bool); //callBack of retrieveTemp
            })
        }
    });
}

db.deleteTemp = function(uniq) {
    var send = "DELETE FROM `unconfirmed` WHERE uniq=" + uniq;
    con.query(send, function(err, result) {
        if (err)
            console.log(err);
    });
}

db.save = function(post, uniqArg, eventidArg) {
    var myDate = new Date(post.date);
    post.date = ISOtoLocalISOtomySQL(myDate);
    //console.log(post);
    var send = 'INSERT INTO status values("{date}","{slot}","{to_slot}","{name}","{id}","{email}","{school}","{purpose}","{key_benefits}","{no_aud}","{type}","{guest_name}","{guest_details}","{uniq}","{eventid}")'
        .supplant({
            date: post.date,
            slot: post.from,
            to_slot: post.to,
            name: post.name,
            id: post.id,
            email: post.email,
            school: post.school,
            purpose: post.purpose,
            key_benefits: post.key_benefits,
            no_aud: post.no_aud,
            type: post.type,
            guest_name: post.guest_name,
            guest_details: post.guest_details,
            uniq: uniqArg,
            eventid: eventidArg
        });

    con.query(send, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {

        }
    });

}

db.remove = function(uniq, callBack) {
    var send = "SELECT eventid FROM status WHERE uniq=" + uniq;
    var resultEventId;
    con.query(send, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            resultEventId = result[0];
            if (resultEventId !== undefined)
                callBack(resultEventId.eventid);
            else {
                callBack(false);
                return;
            }
        }
        db.connect();
        var send = "INSERT INTO deleted SELECT * FROM status WHERE uniq=" + uniq;
        con.query(send, function(err, result) {
            if (err) {
                console.log(err);
            }
            if (result) {

            }

            var send = "DELETE FROM status WHERE uniq=" + uniq;
            con.query(send, function(err, result) {
                if (err) {
                    console.log(err);
                }
                if (result) {

                }
            });
        });
    });
}

db.retrieveFilledStatus = function(date, callBack) {
    var arr = [];
    date = ISOtoLocalISOtomySQL(new Date(date));
    con.query('SELECT * FROM status WHERE date="' + date + '"', function(err, result) {
        result.forEach(function(data) {
            for (var i = data.slot; i < data.to_slot; i++)
                arr.push(i + 1);
        })
        callBack(arr);
    })
    return arr;
}

db.isPresent = function(uniq, callBack) {
    var send = "SELECT * FROM status WHERE uniq=" + uniq;
    con.query(send, function(err, result) {
        //console.log("isPresent");
        //console.log(send);
        console.log(result);
        if (result[0] === undefined)
            callBack(false);
        else
            callBack(true);
    });
}

db.isPresentByTime = function(uniq, callBack) {
    var send = "SELECT data FROM unconfirmed WHERE uniq=" + uniq;
    con.query(send, function(err, result) {
        //console.log("isPresent");
        //console.log(send);
        if (result[0]) {
            var unconfObj = JSON.parse(result[0]["data"]);
            var tempDate = unconfObj.date;
            var queryDate = ISOtoLocalISOtomySQL(new Date(tempDate));
            db.retrieveFilledStatus(queryDate, function(arr) {
                console.log(arr);
                console.log(unconfObj.from + "\n" + unconfObj.to);
                var flag = true;
                for (var i = unconfObj.from; i <= unconfObj.to; i++) {
                    arr.forEach(function(data) { //array.prototype.foreach is synchronous! Yeah!!
                        if (i == data)
                            flag = false;
                    });
                }
                callBack(flag);
            })
        } else {
            callBack(true);
        }
        console.log(unconfObj);
    })

}

db.close = function() {
    con.end();
}

function ISOtoLocalISOtomySQL(d) {
    var tzoffset = d.getTimezoneOffset() * 60000; //offset in milliseconds
    var localISOTime = (new Date(d - tzoffset)).toISOString().slice(0, -1);
    return localISOTime.substring(0, 10);
}

module.exports = db;