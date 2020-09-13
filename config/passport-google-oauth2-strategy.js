const passport = require('passport');
const googleStrategy  = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/userSchema');


passport.use(new googleStrategy({
    clientID:"8776802292-96dptduaqqaaqugnqclrf4tfuupdgl2f.apps.googleusercontent.com",
    clientSecret:"3advUJ0Q7NLodMJ3LlahX_XE",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
   function(accessToken,refreshToken,profile,done ){
       User.findOne({email:profile.emails[0].value}).exec(function(err,user){
          if(err)
          {
              console.log(err);
              return;
          }
          console.log(profile);
          if(user)
          {
              return done(null,user);
          }
          else
          {
              User.create({
                  name:profile.displayName,
                  email:profile.email,
                  password:crypto.randomBytes(20).toString('hex')

              },function(err,user){
                if(err)
                {
                    console.log(err);
                    return;
                }
                return done(null,user);


              });
          }

       });
   }




));

module.exports = passport;