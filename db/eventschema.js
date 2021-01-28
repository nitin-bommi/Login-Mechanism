var mongoose = require('mongoose');

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
};

// Schema stores username, password, email, phone, profile picture path, and messages sent to admin
var eventSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    allDay: Boolean,
})    
var Event = mongoose.model('Event', eventSchema);
module.exports = Event;