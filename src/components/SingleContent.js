import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { UserContext } from "../index";
import { GrFavorite } from "react-icons/gr";

const config = function (id) {
  const APIKEY = "2b91346f39a3585b7133b47e7cdc1dff";
  const baseURL = "https://api.themoviedb.org/3/movie/";
  const urlKeyId = "".concat(baseURL, id, "?api_key=", APIKEY);
  return urlKeyId;
};

const SingleContent = () => {
  const baseURL = "https://image.tmdb.org/t/p/w185";
  const notImage =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.dreamstime.com%2F%25C3%25A1rbol-cerca-del-r%25C3%25ADo-paisaje-esc%25C3%25A9nico-de-la-naturaleza-image131862406&psig=AOvVaw08mPJHYY-LD0ZORgDPEKCO&ust=1645823436302000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMiJ6qqgmfYCFQAAAAAdAAAAABAJ";

  const { id } = useParams();
  const [data, setData] = useState({});
  const urlKeyIdEnv = config(id);

  const { user } = useContext(UserContext);

  const addToFav = function (data) {
    alert("Movie added to favorites");
    axios
      .post("/api/favoritos", {
        email: user.email,
        movieId: data.id,
        title: data.title,
        imgUrl: data.poster_path,
        description: data.overview,
        userId: user.id,
      })
      .then((res) => res.data)
      .then(() => {
        console.log("Movie added to favorites");
      })
      .catch((err) => console.log('Error', err))
  };

  useEffect(() => {
    axios
      .get(urlKeyIdEnv)
      .then((res) => res.data)
      .then((data) => setData(data))
      .catch((err) => {
        console.log("Error", err);
      });
  }, [urlKeyIdEnv]);

  return (
    <section key={data.id} className="layout">
      <div className="is-flex">
        <img
        className="imagen"
          src={data.poster_path ? `${baseURL}${data.poster_path}` : notImage}
          alt=""
          style={{ width: "300px", height: "450px" }}
        />
        <div className=" div_single p-4 is-flex  is-flex-direction-column is-justify-content-space-around ">
          <p className="singleTitle is-size-1">{data.title}</p>
          <div>
            <p>
              <strong className="strong">Description:</strong> {data.overview}
            </p>
            <p className="details">
              <strong className="strong">Original Language:</strong>{" "}
              {data.original_language}
              <br></br>
              <strong className="strong">Vote Average:</strong>{" "}
              {data.vote_average}
            </p>
          </div>
        </div>
        <div>
          {user.id ? (
            <button className="button" onClick={() => addToFav(data)}>
              <p>
                Add <GrFavorite />
              </p>
            </button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SingleContent;
