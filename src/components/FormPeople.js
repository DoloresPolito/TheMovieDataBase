import axios from "axios";
import { useInput } from "../hooks/useInput";
import { PeopleContext } from "../context/PeopleContext";
import { useContext } from "react";
import { useNavigate } from "react-router";

const FormPeople = function () {
  const input = useInput("");
  const people = useContext(PeopleContext);

  const navigate = useNavigate();
  const handleSubmit = function (e) {
    e.preventDefault();

    axios
      .get(`/api/people/${input.value}`)
      .then((res) => res.data)
      .then((result) => {
        people.changePeople(result);

        if (result) {
          navigate(`/api/people/${result.completeName}`);
        } else {
          alert("User not found");
          navigate("/api/inicio");
        }
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <div className="formularioPersonas">
      <form onSubmit={handleSubmit}>
        <input
          id="valorNombre"
          placeholder="Search users"
          onChange={input.onChange}
          className="input"
          value={input.value}
        ></input>
      </form>
    </div>
  );
};

export default FormPeople;
