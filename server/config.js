module.exports = {
	env: process.env.NODE_ENV || 'production',
	URL: 'http://localhost:1994',
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