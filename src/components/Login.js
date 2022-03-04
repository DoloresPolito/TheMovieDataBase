import React, { useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../index";
import { useInput } from "../hooks/useInput";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const email = useInput("");
  const password = useInput("");

  const handleSubmit = function (e) {
    e.preventDefault();
    axios
      .post("/api/login", {
        email: email.value,
        password: password.value,
      })
      .then((res) => res.data)
      .then((usuario) => {
        console.log("usuario logeado", usuario);
        setUser(usuario);
        navigate("/api/inicio");
      })
      .catch((err) => console.log('Ocurrió un error', err))
  };

  return (
    <section className="sign">
      <h2 className=" textRegister mt-6 ">
        Sign in to your account
      </h2>
      <form className=" formularioLogin mt-8 " onSubmit={handleSubmit}>
        <div className="field">
          <p className="control has-icons-left ">
            <input
              onChange={email.onChange}
              value={email.value}
              className="input inputLogin"
              type="email"
              placeholder="Email"
            />
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input
              onChange={password.onChange}
              value={password.value}
              className="input inputLogin"
              type="password"
              placeholder="Password"
            />
          </p>
        </div>
        <div className="field bott-log">
          <p className="control">
            <button className=" buttonLog button is-success">Login</button>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
