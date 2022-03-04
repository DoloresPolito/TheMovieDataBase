import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../index";

import ContentFavourites from "./ContentFavourites";

const Favourites = function () {
  const { user } = useContext(UserContext);
  const [favoritos, setFavoritos] = useState([]);
  const idParametro = user.id;
  
  useEffect(() => {
    axios
      .get(`/api/favoritos/${idParametro}`)
      .then((res) => res.data)
      .then((favoritos) => setFavoritos(favoritos))
      .catch((err) => console.log("error", err));
  }, [idParametro]);

  return (
    <div>
      <ContentFavourites favoritos={favoritos} />
    </div>
  );
};

export default Favourites;
