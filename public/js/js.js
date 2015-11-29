var BASE_URI = "http://localhost:8000"; //DO NOT INCLUDE SUFFIX '/'
var filled, purposeFlag = false,
    typeFlag = false,
    schoolFlag = false;

var socket;
afterLoad = function() {
    socket = io.connect(BASE_URI);

    socket.on('date', function(date) {
        var maxDays = 7; //Maximum number of days available for advance booking
        var range = getDates(new Date(date).addDays(1), new Date(date).addDays(maxDays));
        document.getElementById('date').value = (new Date(range[0])).toString().substring(0, 15);

        var dateOptions = {
            format: "D M dd yyyy",
            startDate: new Date(range[0]),
            endDate: new Date(range[maxDays - 1]),
            multidate: false,
            autoclose: true
        }
        $('.input-group.date').datepicker(dateOptions);


        console.log("Hey");
        getFilledStatus();
    });

    //Generating <option> elements for From drop-down box
    var str = '';
    for (var i = 0; i < 48; i++) {
        var am = 'AM';
        var temp;
        if (i < 24) {
            temp = (i % 2 == 0 ? Number.parseInt(i / 2) : Number.parseInt(i / 2)) + ((i % 2 == 0) ? ":00" : ":30") + " " + am;
            str += '<option value="' + i + '">' + temp + '</option>';
        } else {
            am = 'PM';
            temp = i < 26 ? (i % 2 == 0 ? Number.parseInt(i / 2) : Number.parseInt(i / 2)) + ((i % 2 == 0) ? ":00" : ":30") + " " + am : (i % 2 == 0 ? Number.parseInt(i / 2) : Number.parseInt(i / 2)) % 12 + ((i % 2 == 0) ? ":00" : ":30") + " " + am;
            str += '<option value="' + i + '">' + temp + '</option>';
        }
    }
    document.getElementById('time').innerHTML = str;

    newTime();

    setNotFilled("Loading");

    socket.on('sendFilledStatus', function(data) {
        filled = data;
        console.log(filled);
        setNotFilled("Free");
        data.forEach(function(data) {
            document.getElementById("td" + data).innerHTML = "Reserved";
            document.getElementById("td" + data).style.backgroundColor = "#FF5575";
        });
    })

    socket.on('submittedStatus', function(data) {
        bootbox.alert("Confirmation link has been sent to\n" + document.getElementById('email').value + "\nPlease confirm your booking at the earliest.", function() {
            location.reload(true);
        });
        getFilledStatus();
    })

    socket.on('invalidEmail', function() {
        bootbox.alert("You are not a faculty member/staff of VIT University.\nOnly VIT University faculty members/staff can book the conference hall.");
    })

};

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf())
    dat.setDate(dat.getDate() + days);
    return dat;
}

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate))
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

function getFilledStatus() {
    var date = document.getElementById("date").value;
    setNotFilled("Free");
    if (date)
        socket.emit('getFilledStatus', {
            "date": date
        });
}

function newTime() {
    var value = Number(document.getElementById('time').value);
    var str = '';
    for (var i = value + 1; i <= 48; i++) {
        var am = 'AM';
        var temp;
        if (i < 24) {
            temp = (i % 2 == 0 ? Number.parseInt(i / 2) : Number.parseInt(i / 2)) + ((i % 2 == 0) ? ":00" : ":30") + " " + am;
            str += '<option value="' + i + '">' + temp + '</option>';
        } else {
            am = 'PM';
            i == 48 ? am = 'AM' : am = 'PM';
            temp = i < 26 ? (i % 2 == 0 ? Number.parseInt(i / 2) : Number.parseInt(i / 2)) + ((i % 2 == 0) ? ":00" : ":30") + " " + am : (i % 2 == 0 ? Number.parseInt(i / 2) : Number.parseInt(i / 2)) % 12 + ((i % 2 == 0) ? ":00" : ":30") + " " + am;
            str += '<option value="' + i + '">' + temp + '</option>';
        }
    }
    document.getElementById('totime').innerHTML = str;
}

function setNotFilled(string) {
    var str = '<tr>';
    var elem = document.getElementById("tableStatus1");
    for (var i = 1; i <= 48; i++) {
        if (i == 25) {
            elem.innerHTML = str;
            elem = document.getElementById("tableStatus2");
            str = "";
        }
        if (string === "Free")
            str += '<td id="td' + i + '" style="background-color : #37D317">' + string + '</td>';
        else
            str += '<td id="td' + i + '" style="background-color : #D7D700">' + string + '</td>';
    };
    str += '</tr>'
    elem.innerHTML = str;
}

function clicked() {
    //getFilledStatus();
    if (document.getElementById('date').value.length == 0) {
        bootbox.alert("Please choose a date")
        return;
    }
    if (document.getElementById('name').value.length == 0 || document.getElementById('name').value.length > 100) {
        bootbox.alert("Faculty name should be 1 to 100 characters or less in length")
        return;
    }
    if (document.getElementById('id').value.length == 0 || document.getElementById('id').value.length > 20) {
        bootbox.alert("Faculty ID should be 1 to 20 characters or less in length")
        return;
    }

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@vit.ac.in$/i;
        return re.test(email);
    }
    if (validateEmail(document.getElementById('email').value) != true) {
        bootbox.alert("Please check you E-Mail (Only email registered with the vit.ac.in is supported)");
        return;
    }
    if (document.getElementById('email').value.length > 100) {
        bootbox.alert("E-Mail address should be 1 to 100 characters or less in length")
        return;
    }
    if (schoolFlag === true ? (document.getElementById('schoolOther').value.length == 0 || document.getElementById('schoolOther').value.length > 50) : false) {
        bootbox.alert("School should be 1 to 50 characters or less in length")
        return;
    }
    if (purposeFlag === true ? (document.getElementById('purposeOther').value.length == 0 || document.getElementById('purposeOther').value.length > 500) : false) {
        bootbox.alert("Purpose should be 1 to 500 characters or less in length")
        return;
    }
    if (document.getElementById('key_benefits').value.length == 0 || document.getElementById('key_benefits').value.length > 500) {
        bootbox.alert("Key Benefits should be 1 to 500 characters or less in length")
        return;
    }
    if (isNaN((document.getElementById('no_aud').value)) || document.getElementById('no_aud').value > 60) {
        bootbox.alert("Maximum number of audience is 60")
        return;
    }
    if (typeFlag === true ? (document.getElementById('typeOther').value.length > 20 || document.getElementById('typeOther').value.length == 0) : false) {
        bootbox.alert("Type should be 1 to 20 characters or less in length")
        return;
    }
    if (document.getElementById('guest_name').value.length > 100) {
        bootbox.alert("Guest Name should be 1 to 100 characters or less in length")
        return;
    }
    if (document.getElementById('guest_details').value.length > 500) {
        bootbox.alert("Guest Details should be 1 to 500 characters or less in length")
        return;
    }

    var from = Number(document.getElementById('time').value) + 1;
    var to = Number(document.getElementById('totime').value) + 1;
    var flag = true;
    for (var i = from; i < to; i++) {
        filled.forEach(function(data) {
            if (i == data)
                flag = false;
        });
    }
    if (flag == true) {
        //console.log("Hey");
        socket.emit('submitted', {
            'date': document.getElementById('date').value,
            'from': document.getElementById('time').value,
            'to': document.getElementById('totime').value,
            'name': document.getElementById('name').value,
            'id': document.getElementById('id').value,
            'email': document.getElementById('email').value,
            'school': document.getElementById('school').value,
            'purpose': purposeFlag === true ? document.getElementById('purposeOther').value : getSelectedListValue("purpose"),
            'key_benefits': document.getElementById('key_benefits').value,
            'no_aud': document.getElementById('no_aud').value,
            'type': typeFlag === true ? document.getElementById('typeOther').value : getSelectedListValue("type"),
            'guest_name': document.getElementById('guest_name').value,
            'guest_details': document.getElementById('guest_details').value
        });
    } else
        bootbox.alert("Booking failed, check your slots!")
}

function schoolChanged() {
    var selectedPurpose = getSelectedListValue("school");
    if (selectedPurpose === "Other") {
        document.getElementById('schoolOther').className = "form-control";
        schoolFlag = true;
    } else {
        document.getElementById('schoolOther').className = "form-control hideMe";
        schoolFlag = false;
    }
}

function purposeChanged() {
    var selectedPurpose = getSelectedListValue("purpose");
    if (selectedPurpose === "Other") {
        document.getElementById('purposeOther').className = "form-control";
        purposeFlag = true;
    } else {
        document.getElementById('purposeOther').className = "form-control hideMe";
        purposeFlag = false;
    }
}

function typeChanged() {
    var selectedPurpose = getSelectedListValue("type");
    if (selectedPurpose === "Other") {
        document.getElementById('typeOther').className = "form-control";
        typeFlag = true;
    } else {
        document.getElementById('typeOther').className = "form-control hideMe";
        typeFlag = false;
    }
}

function getSelectedListValue(str) {
    var e = document.getElementById(str);
    var selectedPurpose = e.options[e.selectedIndex].value;
    return selectedPurpose;
}