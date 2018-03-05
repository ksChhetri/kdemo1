var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
var UserProfile = mongoose.model('UserProfile');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
  console.log('register data:',req.body);

  var user = new User();

  user.firstname = req.body.firstname;
  user.lastname = req.body.lastname;
  user.phone = req.body.phonenumber;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    console.log("nuser",err, user);

    var userProfile = new UserProfile({subdomain: user._id});
    console.log("usepp", userProfile);

    userProfile.save(function(err, newprofile) {
      console.log("nuserppp",err, newprofile);
      // var token;
      // token = user.generateJwt();
      res.status(200);
      // res.json({
      //   "token" : token
      // });
    });
  });
};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};
