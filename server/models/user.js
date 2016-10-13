const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const Promise = require('bluebird');

let UserSchema = new Schema({
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
	],
	userType: String,
	dealer: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	factory: [
		Schema.Types.ObjectId
	],
	product: [
		{
			src: String,
			name: String,
			price: String,
			w: Number,
			h: Number
		}
	]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = Promise.promisifyAll(mongoose.model('User', UserSchema));
