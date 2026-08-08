/* const Student = require('../Model/StudentModel'); 
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await Student.findOne({ googleId: profile.id }); 
        
        if (user) {
            return done(null, user); 
        }

        user = await Student.create({
            googleId: profile.id,
            Username: profile.displayName,
            email: profile.emails[0].value,
            isVerified: true,
            role: 'user'
        });
    
        return done(null, user);
    }
   catch (error) {
        return done(error, null);
    }
}));

module.exports = passport; */