const express = require("express");
const router = express.Router();

const { passport } = require("../../authenticate");
const PassController = require("../controllers/pass");
router.get("/", PassController.landingAPI);
router.post("/signup", PassController.pass_signup_user);

router.post(
  "/login",
  passport.authenticate("local"),
  PassController.pass_login_user
);

router.get("/logout", PassController.pass_logout_user);

module.exports = router;
