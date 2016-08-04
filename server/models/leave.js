var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LeaveSchema = new Schema({
	startDate: Date,
	endDate: Date,
	reason: String
});

module.exports = mongoose.model('Leave', LeaveSchema);