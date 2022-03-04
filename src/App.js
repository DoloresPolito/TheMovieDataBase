import React from "react";
import { Routes, Route } from "react-router";
import { useEffect, useContext } from "react";
import { useState } from "react";
import axios from "axios";
import "./App.scss";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Grid from "./components/Grid";
import SingleContent from "./components/SingleContent";
import Favourites from "./components/Favourites";
import UserProfile from "./components/UserProfile";

import { UserContext } from "./index";
import { SearchContext } from "./context/SearchContext";

const App = function () {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=2b91346f39a3585b7133b47e7cdc1dff&language=en-US&page=1"
      )
      .then((result) => result.data)
      .then((movies) => {
        setMovies(movies?.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const { setUser } = useContext(UserContext);
  const search = useContext(SearchContext);

  useEffect(() => {
    axios
      .get("/api/me")
      .then((res) => res.data)
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, [setUser]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Grid movies={movies} />} />
        <Route path="/api/inicio" element={<Grid movies={movies} />} />
        <Route path="api/inicio/:id" element={<SingleContent />} />
        <Route path="api/peliculas/busqueda/:input" element={<Grid movies={search.search} />}/>
        <Route path="api/peliculas/busqueda/:input/:id" element={<SingleContent />} />
        <Route path="/api/favoritos" element={<Favourites />} />
        <Route path="/api/people/:name" element={<UserProfile />} />
        <Route path="/api/register" element={<Register />} />
        <Route path="/api/login" element={<Login />} />
        <Route path="/api/logout" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
