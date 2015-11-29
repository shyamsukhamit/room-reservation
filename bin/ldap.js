var ldapUsername = 'testuser@vit.ac.in';
var ldapPassword = 'testuser123';
var ActiveDirectory = require('activedirectory');
var config = {
	url: 'ldap://10.10.4.12',
	baseDN: 'dc=vit,dc=ac,dc=in',
	username: ldapUsername,
	password: ldapPassword 
}
module.exports=function(usernameToTest,callBack){
	//var usernameToTest="testuser@vit.ac.in";
	var ad = new ActiveDirectory(config);
	ad.userExists(usernameToTest, function(err, existsBoolean) {
		callBack(existsBoolean);
		return
	});
}