var mongoose = require('mongoose')


var Priority = mongoose.Schema({
  name        :  String,
  color       :  String,
  createdAt   :  {type: Date, default: Date.now}
});

mongoose.model('Priority', Priority);
//it's initializing this as a model - putting it in memory. so when you say
//new Priority, "this allows you to new up something"