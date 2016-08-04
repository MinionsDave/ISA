var nodemailer = require('nodemailer');

var config = {
	host: 'smtp.exmail.qq.com',
	port: 465,
	auth: {
		user: 'wudengguang@isa.qa',
		pass: 'Jovaunn1'
	}
};

var transporter = nodemailer.createTransport(config);

var mail = {
	from: '吴登广<wudengguang@isa.qa>',
	subject: '验证邮箱',
	text: '点击验证铜通过',
	to: '651882883@qq.com'
};

transporter.sendMail(mail, function(error, info){
    if(error) return console.log(error);
    console.log('mail sent:', info.response);
});