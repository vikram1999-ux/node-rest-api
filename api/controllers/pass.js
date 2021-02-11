const Pass = require("../models/pass");
var passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const { response } = require("express");

exports.pass_get_user = (req, res, next) => {
  passport.authenticate("local")(req, res, () => {
    res.statusCode = 300;
    res.setHeader("Content-Type", "application/json");
    res.json({ success: true, status: "Unauthorized route" });
  });
};

exports.pass_signup_user = (req, res, next) => {
  Pass.register(
    new Pass({ username: req.body.username }),
    req.body.password,
    (err, pass) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Registration Successful!" });
        });
      }
    }
  );
};

exports.pass_login_user = (req, res, next) => {
  console.log(req.session);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ success: true, status: "You are successfully logged in!" });
};

exports.pass_logout_user = (req, res, next) => {
  console.log("in here...");
  console.log(req.session);
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id'");
    req.logOut();
    console.log("deleted->", req.session);
    res.redirect("/");
  } else {
    var err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
};
exports.landingAPI = (req, res, next) => {
  console.log("in here...");
  res.status(200).json({
    data: "logged-out successfully",
  });
};
