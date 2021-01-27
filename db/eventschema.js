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
    title: string,
    start: Date,
    end: Date,
    allDay: boolean,
    resource: string
})    
var Event = mongoose.model('Event', eventSchema);
module.exports = Event;