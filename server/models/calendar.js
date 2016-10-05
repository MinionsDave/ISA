const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CalendarSchema = new Schema({
    date: {
        type: Number,
        index: {
            unique: true
        }
    },
    events: [{
        type: Schema.Types.ObjectId,
        ref: 'Calendar'
    }]
});

module.exports = mongoose.model('Calendar', CalendarSchema);