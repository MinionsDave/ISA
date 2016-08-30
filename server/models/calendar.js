var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CalendarSchema = new Schema({
    date: {
        type: Number,
        index: {
            unique: true
        }
    },
    event: String
});

module.exports = mongoose.model('Calendar', CalendarSchema);