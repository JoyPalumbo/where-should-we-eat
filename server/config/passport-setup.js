const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./auth-keys');

passport.use(
  new GoogleStrategy([
    // options for google strategy
    // Rethink this callback URI to make with work with Single Page App
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: 'http://localhost'
  ], (accessToken, refreshToken, profile, email, openid, done) => {
    // passport callback function
    console.log(profile, email, openid);
    // Using the profile, check to see if a user with that googleid
    // exists in our database or not. Lookup / Create user
  })
);

// Export this middleware for use in the app