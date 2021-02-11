var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var passportLocalMongoose = require("passport-local-mongoose");

var Pass = new Schema({
  admin: {
    type: Boolean,
    default: false,
  },
  // username: {
  //   type: String,
  //   default: undefined,
  // },
  // password: {
  //   type: String,
  //   default: undefined,
  // },
});

Pass.plugin(passportLocalMongoose);

// module.exports = mongoose.model("Pass", Pass);

// const mongoose = require("mongoose");

// const passSchema = mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
// });

module.exports = mongoose.model("Pass", Pass);
