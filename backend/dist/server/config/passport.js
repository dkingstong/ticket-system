"use strict";

var _passport = _interopRequireDefault(require("passport"));
var _passportHttp = require("passport-http");
var _users = _interopRequireDefault(require("../models/users.js"));
var _passportLocal = _interopRequireDefault(require("passport-local"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_passport["default"].use(new _passportHttp.Strategy(function (userid, password, done) {
  _users["default"].findOne({
    email: userid,
    hashedPassword: password
  }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }
    return done(null, {
      id: user.id,
      role: user.role
    });
  });
}));
_passport["default"].use(new _passportLocal["default"](function verify(username, password, cb) {
  _users["default"].findOne({
    email: username,
    hashedPassword: password
  }, function (err, user) {
    if (err) {
      return cb(err);
    }
    if (!user) {
      return cb(null, false, {
        message: 'Incorrect username or password.'
      });
    }
    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
      if (err) {
        return cb(err);
      }
      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, {
          message: 'Incorrect username or password.'
        });
      }
      return cb(null, user);
    });
  });
}));