import { useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useInput } from "../hooks/useInput";
import { SearchContext } from "../context/SearchContext";
// import { UserContext } from "../index";

const config = function (input) {
  const APIKEY = "2b91346f39a3585b7133b47e7cdc1dff";
  const baseURL = "https://api.themoviedb.org/3/";
  const urlKeyWord = "".concat(
    baseURL,
    "search/movie?api_key=",
    APIKEY,
    "&query=",
    input
  );
  return urlKeyWord;
};

const FormMovies = function () {
  // const { setUser } = useContext(UserContext);
  const search = useContext(SearchContext);
  const input = useInput("");
  const navigate = useNavigate("");

  const handleSubmit = function (e) {
    e.preventDefault();
    const urlKeyWordEnv = config(input.value);
    axios
      .get(urlKeyWordEnv)
      .then((result) => result.data)
      .then((movies) => {
        search.changeSearch(movies?.results);
        navigate(`/api/peliculas/busqueda/${input.value}`);
      })
      .catch((err) => console.log("error", err));
  };
  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search movies"
          onChange={input.onChange}
          className="input inputMovies"
          value={input.value}
        ></input>
      </form>
    </div>
  );
};

export default FormMovies;
