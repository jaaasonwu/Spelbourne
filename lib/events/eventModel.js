const mongoose = require('mongoose');

let eventSchema = mongoose.Schema({
    location: String,
    organizerID: String,
    participants: [String],
    description: String,
    createEventDate: { type: Date, default: Date.now },
    startDate: { type: Date },
    startTime: String,
    duration: Number,
    visibility: { type: String, enum: ['Friends', 'Public'] },
    sportType: {type: String, enum: ['Tennis', 'Soccer', 'Swimming', 'Basketball']}
});

module.exports = mongoose.model('Event', eventSchema);
