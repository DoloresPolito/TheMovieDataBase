import { Link } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../index";
import Formulario from "./FormMovies";
import FormPeople from "./FormPeople";

const Navbar = function () {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = function () {
    axios
      .post("/api/logout")
      .then(() => {
        setUser({});
        console.log("success logout");
        navigate("/api/login");
      })
      .catch((err) => console.log("Ocurrió un error", err));
  };

  return (
    <>
      <nav className="navbar ">
        <div className="navbar-item mt-2">
          <Link to="/api/inicio">
            <button className="button">
              <strong>Movies</strong>
            </button>
          </Link>
          <Formulario />
        </div>

        <div className="navbar-item navbar-end mt-2">
          <div className="navbar-item navbar-end mt-2 ml-4">
            <h1 className="nombreNavbar">{user.completeName}</h1>
          </div>

          <FormPeople />

          {user.id ? (
            <div>
              <div className="is-flex is-justify-content-space-between">
                <Link to="/api/favoritos">
                  <button className="button">
                    <strong>Favoritos</strong>
                  </button>
                </Link>
                <Link to="/api/login">
                  <button onClick={handleLogout} className="button">
                    <strong>Logout</strong>
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <Link to="/api/login">
                <button className="button">
                  <strong>Login</strong>
                </button>
              </Link>
              <Link to="/api/register">
                <button className="button">
                  <strong>Register</strong>
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
