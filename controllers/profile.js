var mongoose = require('mongoose');
var User = mongoose.model('User');
var UserProfile = mongoose.model('UserProfile');

module.exports.profileRead = function(req, res) {
  console.log("profile", req.payload);

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        UserProfile.find({ 'userId': req.payload._id })
        .exec(function(err, profile) {
          res.status(200).json(user, profile);
        });
      });
  }
};

module.exports.profileUpdate = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
  console.log('profile data:',req.body);

  if (!req.body._id) {
     res.status(200).json({msg: "fail"});
     return;
  }

  var userProfile = {};
  var user = {};

  if (req.body.country)
     userProfile.country = req.body.country;

  if (req.body.city)
     userProfile.city = req.body.city;

  if (req.body.state)
     userProfile.state = req.body.state;

  if (req.body.postal)
     userProfile.postal = req.body.postal;

  if (req.body.firstname)
     user.firstname = req.body.firstname;

  if (req.body.lastname)
     user.lastname = req.body.lastname;

  // TODO we should update email/phone in another way
  // if (!req.body.phone)
  // user.phone = req.body.phonenumber;
  //
  // if (!req.body.email)
  // user.email = req.body.email;

  User.findByIdAndUpdate(req.body._id, { $set: user }, function(err, newuser) {
    console.log("newuser", newuser);
    UserProfile.update({ subdomain: req.body._id }, { $set: userProfile }, function(err, newuserProfile) {
      res.status(200).json({msg: "success"});
    });
  });
};
