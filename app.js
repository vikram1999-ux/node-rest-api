const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { passport } = require("./authenticate");
const session = require("express-session");
mongoose
  .connect("mongodb://localhost:27017/myapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connection successful...");
  })
  .catch((e) => {
    console.log("connection unsuccessful");
  });

mongoose.Promise = global.Promise;

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");
const passRoutes = require("./api/routes/pass");

app.use(morgan("dev"));
app.use(express.static("uploads"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(
  session({
    secret: "secret token",
    saveUninitialized: true,
    resave: false,
    // unset: "keep",
    // generate: "store",
    // name: "session cookie name",
    // genid: (req) => {
    //   // returns a random string to be used as a session ID
    // },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/pass", passRoutes);
app.use("/", passRoutes);

app.use((req, res, next) => {
  const error = new Error("API Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
