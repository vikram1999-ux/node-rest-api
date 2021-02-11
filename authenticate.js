var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var Pass = require("./api/models/pass");

passport.use(new LocalStrategy(Pass.authenticate()));
passport.serializeUser(Pass.serializeUser());
passport.deserializeUser(Pass.deserializeUser());

module.exports = { passport };
