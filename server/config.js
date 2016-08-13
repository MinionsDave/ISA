module.exports = {
	env: process.env.NODE_ENV || 'production',
	URL: 'http://192.168.0.102:1994',
	mongodb: 'mongodb://localhost/node-in-action',
	smtp: {
		host: 'smtp.exmail.qq.com',
		port: 465,
		auth: {
			user: 'wudengguang@isa.qa',
			pass: 'Jovaunn1'
		}
	}
}