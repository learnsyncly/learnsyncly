var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create user schema
var userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creator: Boolean,
  presentations: Array
});

// create presentation schema
var presentationSchema = new Schema({
  name: { type: String, required: true, unique: true },
  length: Number,
  videos:[{
    aspectRatio: Number
  }],
  slides: [{
    timestamp: Date,
    slide: Number,
    aspectRatio: Number
  }]
});

var User = mongoose.model('User', userSchema);
var Presentation = mongoose.model('Presentation', presentationSchema);

module.exports = User;
module.exports = Presentation;
