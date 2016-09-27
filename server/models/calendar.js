const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = require('./event');

const CalendarSchema = new Schema({
    date: {
        type: Number,
        index: {
            unique: true
        }
    },
    events: [EventSchema]
});

module.exports = mongoose.model('Calendar', CalendarSchema);