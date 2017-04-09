const mongoose = require('mongoose');

let eventSchema = mongoose.Schema({
    location: String,
    organizerID: String,
    participants: [String],
    description: String,
    createEventDate: { type: Date, default: Date.now },
    eventDate: { type: Date },
    endDate: { type: Date },
    visibility: { type: String, enum: ['Friends', 'Public'] }
});

module.exports = mongoose.model('Event', eventSchema);
