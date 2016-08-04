var _ = require('lodash');
var nodemailer = require('nodemailer');

var config = require('../config');

var smtpConfig = config.smtp;

var defaultMail = {
	from: '吴登广<wudengguang@isa.qa>'
};

var transporter = nodemailer.createTransport(smtpConfig);

module.exports = function (mail) {
	mail = _.merge({}, defaultMail, mail);

	transporter.sendMail(mail, function(error, info){
	    if(error) return console.log(error);
	    console.log('mail sent:', info.response);
	});
};