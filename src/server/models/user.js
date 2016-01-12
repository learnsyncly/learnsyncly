var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var config = require('../config');

var userSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  github: {
    type: String
  },
  creator: Boolean,
  presentations: Array
});


userSchema.pre('save', function(next) {
  var now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

userSchema.methods.hashPassword = function(password, callback) {
  var hash = bcrypt.hash(password, null, null, function(err, hash) {
    callback(hash);
  });
};

userSchema.methods.comparePassword = function(attempt, hash, callback) {
  bcrypt.compare(attempt, hash, function(err, res) {
    callback(res);
  });
};

module.exports = mongoose.model('User', userSchema);
