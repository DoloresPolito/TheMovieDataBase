import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useInput } from "../hooks/useInput";

const Register = () => {
  const navigate = useNavigate();
  const name = useInput("");
  const lastname = useInput("");
  const email = useInput("");
  const password = useInput("");

  const handleSubmit = function (e) {
    e.preventDefault();
    axios
      .post("/api/register", {
        name: name.value,
        lastname: lastname.value,
        email: email.value,
        password: password.value,
      })
      .then((res) => res.data)
      .then((usuario) => {
        console.log("usuario registrado", usuario);
        navigate("/api/login");
      })
      .catch((err) => console.log("Ocurrió un error ", err));
  };

  return (
    <section className="sign">
      <h2 className=" tit-sign textRegister mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
        Create you account
      </h2>
      <form className="mt-8 " onSubmit={handleSubmit}>
        <div className="field">
          <p className="control has-icons-left ">
            <input
              onChange={name.onChange}
              value={name.value}
              className="input inputLogin"
              type="name"
              placeholder="Name"
            />
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left ">
            <input
              onChange={lastname.onChange}
              value={lastname.value}
              className="input inputLogin"
              type="lastname"
              placeholder="Last Name"
            />
          </p>
        </div>

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
            <button className=" buttonReg button is-success ">
              Create Account
            </button>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Register;
