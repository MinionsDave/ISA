const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    dates: [Number],
    reason: {
        type: String,
        required: true
    },
    userId: Schema.Types.ObjectId,
    type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Event', EventSchema);