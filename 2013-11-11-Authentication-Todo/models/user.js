var mongoose = require('mongoose');

var User = mongoose.Schema({
  email     : {type: String, required: true},
  password  : {type: String, required: true},
  createdAt : {type: Date, default: Date.now}
});

mongoose.model('User', User);