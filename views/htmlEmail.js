var BASE_URI = "http://localhost:8000"; //DO NOT INCLUDE SUFFIX '/'
module.exports = function(date, from, to, name, id, email, school, purpose, keyBenefits, noOfAudience, type, uniq) {
    var str = '<!DOCTYPE html>' +
        '<html style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">' +
        '<head>' +
        '<meta name="viewport" content="width=device-width">' +
        '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">' +
        '<title>Confirm your booking</title>' +
        '</head>' +
        '<body bgcolor="#f6f6f6" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; -webkit-font-smoothing: antialiased; height: 100%; -webkit-text-size-adjust: none; width: 100% !important; margin: 0; padding: 0;">' +
        '	<table class="body-wrap" bgcolor="#f6f6f6" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; width: 100%; margin: 0; padding: 20px;"><tr style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">' +
        '<td style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;"></td>' +
        '			<td class="container" bgcolor="#FFFFFF" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; clear: both !important; display: block !important; max-width: 600px !important; margin: 0 auto; padding: 20px; border: 1px solid #f0f0f0;">' +
        '				' +
        '				<div class="content" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; display: block; max-width: 600px; margin: 0 auto; padding: 0;">' +
        '					<table style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; width: 100%; margin: 0; padding: 0;"><tr style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">' +
        '<td style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">' +
        '								<p style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6em; font-weight: normal; margin: 0 0 10px; padding: 0;">Greetings from Periyar EVR Central Library!</p>' +
        '								<p style="text-indent: 2em; font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6em; font-weight: normal; margin: 0 0 10px; padding: 0;">Please ' +
        '' +
        '									<b style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">click the link below to confirm your booking</b> at the Video Conference Hall of the Periyar EVR Central Library, VIT University.' + '<p style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6em; font-weight: normal; margin: 0 0 10px; padding: 0;"><b>Event Summary</b><br></p>' +
        '<table style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6em; font-weight: normal; margin: 0 0 10px; padding: 0; margin-left:auto; margin-right:auto;">' +
        '<tr><td style="text-align:right">Date :</td><td>' + date + '</td></tr>' +
        '<tr><td style="text-align:right">From :</td><td>' + from + '</td></tr>' +
        '<tr><td style="text-align:right">To :</td><td>' + to + '</td></tr>' +
        '<tr><td style="text-align:right">Name :</td>' + name + '</td></tr>' +
        '<tr><td style="text-align:right">Faculty ID :</td>' + id + '</td></tr>' +
        '<tr><td style="text-align:right">E-Mail :</td>' + email + '</td></tr>' +
        '<tr><td style="text-align:right">School :</td>' + school + '</td></tr>' +
        '<tr><td style="text-align:right">Purpose :</td>' + purpose + '</td></tr>' +
        '<tr><td style="text-align:right">Key Benefits :</td>' + keyBenefits + '</td></tr>' +
        '<tr><td style="text-align:right">No. of Audience :</td>' + noOfAudience + '</td></tr>' +
        '<tr><td style="text-align:right">Type :</td>' + type + '</td></tr>' +
        '' +

        '								</p>' +
        '								' +
        '								<table class="btn-primary" cellpadding="0" cellspacing="0" border="0" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; width: auto !important; margin: 0 auto 10px; padding: 0;"><tr style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">' +
        '<td style="font-family: \'Helvetica Neue\', Helvetica, Arial, \'Lucida Grande\', sans-serif; font-size: 14px; line-height: 1.6em; border-radius: 25px; text-align: center; vertical-align: top; background-color: #348eda; margin: 0; padding: 0;" align="center" bgcolor="#348eda" valign="top">' +
        '											<a href="' + BASE_URI + "/confirmation/" + uniq +
        '" style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 2; color: #ffffff; border-radius: 25px; display: inline-block; cursor: pointer; font-weight: bold; text-decoration: none; background-color: #348eda; margin: 0; padding: 0; border-color: #348eda; border-style: solid; border-width: 10px 20px;">Click here to confirm your booking</a>' +
        '										</td>' +
        '									</tr></table>' +
        '<p style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 1.6em; font-weight: normal; margin: 0 0 10px; padding: 0;">PERIYAR EVR CENTRAL LIBRARY,' +
        '' +
        '									<br style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">VIT UNIVERSITY,' +
        '' +
        '									<br style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">Vellore - 632014' +
        '' +
        '									<br style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">Tamil Nadu' +
        '' +
        '									<br style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;">India' +
        '' +
        '								</p>' +
        '							</td>' +
        '						</tr></table>' +
        '</div>' +
        '				' +
        '			</td>' +
        '			<td style="font-family: \'Helvetica Neue\', \'Helvetica\', Helvetica, Arial, sans-serif; font-size: 100%; line-height: 1.6em; margin: 0; padding: 0;"></td>' +
        '		</tr></table>' +
        '</body>' +
        '</html>';
    return str;
};