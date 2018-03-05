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
    profile_res = {};
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        console.log("user: ", err, user);
        if (user) {
          profile_res.firstname = user.firstname;
          profile_res.lastname = user.lastname;
          profile_res.phone = user.phone;
          profile_res.email = user.email;
        }

        UserProfile.find({ 'subdomain': req.payload._id })
        .exec(function(err, profile) {
          console.log("profile: ", err, profile);
          if (profile) {
            profile_res.profile = profile;
          }
          res.status(200).json(profile_res);
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
  console.log('profile data:',req.body, req.payload);

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
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

  console.log("user", user, userProfile);

  User.findByIdAndUpdate(req.payload._id, { $set: user }, function(err, newuser) {
    console.log("newuser", newuser);
    UserProfile.update({ subdomain: req.payload._id }, { $set: userProfile }, function(err, newuserProfile) {
      res.status(200).json({msg: "success"});
    });
  });
};
