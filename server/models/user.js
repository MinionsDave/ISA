var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
	username: {
		type: String,
		index: {
			unique: true
		}
	},
	password: String,
	active: {
		type: Boolean,
		default: false
	},
	activeToken: String,
	activeExpires: Date,
	avatar: String,
	name: String,
	job: String,
	birthday: Date,
	hometown: String,
	address: String,
	phonenumber: Number,
	qq: String,
	wechat: String,
	interests: [
		String
	]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);