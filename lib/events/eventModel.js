const mongoose = require('mongoose');

let eventSchema = mongoose.Schema({
    location: String,
    locationId: String,
    organizerID: String,
    skillLevel:{type:String, enum:['Any', 'Beginner', 'Intermediate','Expert']},
    participants: [String],
    description: String,
    createEventDate: { type: Date, default: Date.now },
    startDate: { type: Date },
    startTime: String,
    skillLevel: String,
    duration: Number,
    visibility: { type: String, enum: ['Friends', 'Public'] },
    sportType: {type: String, enum: ['Tennis', 'Soccer', 'Swimming', 'Basketball', 'Golf', 'Running']},
    imagePath: String
});

module.exports = mongoose.model('Event', eventSchema);
