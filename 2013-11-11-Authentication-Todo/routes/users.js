var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');

exports.create = function(req, res){
  var user = new User();
  user.email = req.body.email;

  bcrypt.hash(req.body.password, 10, function(err, hash){
    user.password = hash;
    user.save(function(err, user){
      if(err)
        res.send({status: 'error'});
      else
        res.send({status: 'ok'});
    });
  });
}


exports.login = function(req, res){
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({email: req.body.email}, function(err, user){
    if(user){
      bcrypt.compare(req.body.password, user.password, function(err, result){
        if(result){
          req.session.regenerate(function(err){
            req.session.userId = user.id;//you only have to use '_id' in the browser
            req.session.save(function(err){//saving it to redis, then send status ok when savee is finished.
              res.send({status: 'ok'});
            });
          });
        }else{
          req.session.destroy(function(err){
            res.send({status: 'wrong password'});
          });
        }
      });
    } else{
      res.send('wrong email');
    };
  });
}

