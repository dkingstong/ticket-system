import passport from 'passport';
import { Strategy as BasicStrategy } from 'passport-http';
import User from '../models/users.js'
import LocalStrategy from 'passport-local'

passport.use(new BasicStrategy(
  function(userid, password, done) {
    User.findOne({ email: userid, hashedPassword: password }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, {id: user.id, role: user.role});
    });
  }
));

passport.use(new LocalStrategy(function verify(username, password, cb) {
  User.findOne({ email: username, hashedPassword: password }, function(err, user) {
    if (err) { return cb(err); }
    if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); 
  }

    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
      if (err) { return cb(err); }
      if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
        return cb(null, false, { message: 'Incorrect username or password.' });
      }
      return cb(null, user);
    });
  });
}));