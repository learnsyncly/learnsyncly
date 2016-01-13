var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// create presentation schema
var presentationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  length: Number,
  videos: [{
    aspectRatio: String
  }],
  slides: [{
    timestamp: Date,
    slide: Number,
    aspectRatio: String
  }]
});

module.exports = mongoose.model('Presentation', presentationSchema);
