var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var LeaveSchema = require('./leave').schema;

var UserSchema = new Schema({
	username: {
		type: String,
		index: {
			unique: true
		}
	},
	password: String,
	email: {
		type: String,
		index: {
			unique: true
		}
	},
	active: {
		type: Boolean,
		default: false
	},
	activeToken: String,
	activeExpires: Date,
	avatar: String,
	leaves: [
		LeaveSchema
	]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);