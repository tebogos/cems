const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./configuration');
const User = require('./models/user');
const bcrypt = require('bcryptjs');

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.JWT_SECRET
}, async (payload, done) => {
  try {
    console.log("payload",payload);
    // Find the user specified in token
    const user = await User.findById(payload.sub);

    // If user doesn't exists, handle it
    if (!user) {
      console.log(" If user doesn't exists, handle it---1");
      
      return done(null, false);
    }
    console.log(" User fount , handle it--->2 ",user);
    // Otherwise, return the user
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));

// Google OAuth Strategy
passport.use('googleToken', new GooglePlusTokenStrategy({
  clientID: config.oauth.google.clientID,
  clientSecret: config.oauth.google.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Should have full user profile over here
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    const existingUser = await User.findOne({ "google.email": profile.emails[0].value });
    console.log("existingUser : ",existingUser);
    if (existingUser) {
      if(existingUser.google.google_id){
        const valid= profile.id===existingUser.google.google_id?true:false;
        console.log("valid---> : ",valid);
        if(valid)
           return done(null, existingUser);
          done(error, false, "Please ask the admin for help");

       }
         else{
          //  const salt = await bcrypt.genSalt(10);
         
          
           User.update({ "google.email": profile.emails[0].value },{
             $set:{'google.google_id':profile.id}
           },function(err,numAffect){
             if (err)
            {
               console.log("erro : ",err);
              return next(err);

           }
           });
         }
    }

    else{
      // console.log("User dose not exist :",profile.emails[0].value);
      
      // done(error, false, "Please ask the admin for help");
      User.update({ "google.email": profile.emails[0].value },{
        $set:{'google.google_id':profile.id}
      },function(err,numAffect){
        if (err)
       {
          console.log("erro : ",err);
         return next(err);

      }
      });

    }


    // const newUser = new User({
    //   method: 'google',
    //   google: {
    //     google_id: profile.id,
    //     email: profile.emails[0].value
    //   }
    // });

    // await newUser.save();
    // done(null, newUser);
      done(null, {done:done});
  } catch(error) {
    done(error, false, error.message);
  }
}));

passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: config.oauth.facebook.clientID,
  clientSecret: config.oauth.facebook.clientSecret
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log('profile', profile);
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);

    const existingUser = await User.findOne({ "facebook.id": profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      method: 'facebook',
      facebook: {
        id: profile.id,
        email: profile.emails[0].value
      }
    });

    await newUser.save();
    done(null, newUser);
  } catch(error) {
    done(error, false, error.message);
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    // Find the user given the email
    const user = await User.findOne({ "local.email": email });
    
    // If not, handle it
    if (!user) {
      console.log(" If user doesn't exists, handle it---1");
      return done(null, false);
    }

    // Check if the password is correct
    const isMatch = await user.isValidPassword(password);
    console.log(" If user doesn't existsuser found , handle it--->2");
    // If not, handle it
    if (!isMatch) {
      
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));
