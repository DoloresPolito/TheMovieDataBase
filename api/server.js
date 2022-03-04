const express = require("express");
const app = express();
const morgan = require("morgan");
const db = require("./configDb");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const cors = require("cors");

const User = require("./models/Users");


app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());

app.use(
  sessions({ secret: "bootcamp", resave: true, saveUninitialized: true })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    function (email, password, done) {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false);
            }
            return done(null, user);
          });
        })
        .catch(done);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
});

app.use("/api", routes);

db.sync({ force: false}).then(() => {
  console.log("DB connected");
  app.listen(3001, () => {
    console.log("Servidor corriendo en el puerto 3001");
  });
});
