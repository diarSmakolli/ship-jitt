const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '128190427349-mgg5mho22lmshnr6vis7hpl4lnh4patn.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:6099/auth/google/callback'
}))