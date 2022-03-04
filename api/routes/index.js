const express = require("express");
const User = require("../models/Users");
const Favoritos = require("../models/Favoritos");
const passport = require("passport");

const router = express.Router();

//aca ya estoy en /api

//REGISTER - LOGIN - LOGOUT

router.post("/register", (req, res) => {
  console.log("req.body de register => ", req.body);
  User.create(req.body).then((user) => {
    res.status(201).send(user);
  })
  .catch((err) => console.log('error', err))
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(200);
});

router.get("/me", (req, res) => {
  if (!req.user) {
    return res.sendStatus(401);
  }
  res.send(req.user);
});

// USERS

router.get("/users", (req, res, next) => {
  User.findAll()
    .then((res) => res.data)
    .then((usuarios) => res.send(usuarios))
    .catch(next);
});

router.get("/people/:email", (req, res) => {
  console.log("esto es req params email", req.params.email);
  User.findOne({ where: { email: req.params.email } }).then((people) => {
    res.status(200).send(people);
  })
  .catch((err) => console.log('error', err))
});

//FAVORITES

router.post("/favoritos", (req, res) => {
  Favoritos.create(req.body).then((fav) => {
    res.status(201).send(fav);
  })
  .catch((err) => console.log('error', err))
});

router.delete("/favoritos/:user/:id", (req, res) => {
  console.log(req.params.user);
  console.log(req.params.id);

  Favoritos.destroy({
    where: { movieId: req.params.id, userId: req.params.user },
  }).then(() => {
    res.status(202).send("pelicula eliminada");
  })
  .catch((err) => console.log('error', err))
});

router.get("/favoritos/:id", (req, res) => {
  Favoritos.findAll({ where: { userId: req.params.id } }).then((fav) => {
    res.status(200).send(fav);
  })
  .catch((err) => console.log('error', err))
});

router.get("/people/:id/movies", (req, res) => {
  Favoritos.findAll({ where: { userId: req.params.id } })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((err) => console.log("error", err));
});

module.exports = router;
