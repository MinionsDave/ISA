var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeaveSchema = new Schema({
	dates: [
        {
            date: Number
        }
    ],
	reason: String,
	userId: String
});

module.exports = mongoose.model('Leave', LeaveSchema);