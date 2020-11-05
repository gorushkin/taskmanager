import passwordJWT from 'passport-jwt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const { Strategy: JwtStrategy, ExtractJwt } = passwordJWT;

dotenv.config();

const User = mongoose.model('users');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT,
};

const passport = (passport) => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
        const user = await User.findById(payload.userId).select('email id');
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error) {
        console.log(error);
      }
    })
  );
};

export default passport;
