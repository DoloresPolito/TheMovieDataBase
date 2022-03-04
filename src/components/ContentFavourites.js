import axios from "axios";
import { useContext} from "react";
import { UserContext } from "../index";
import { GrFavorite } from "react-icons/gr";

const ContentFavourites = function ({ favoritos }) {
  const baseURL = "https://image.tmdb.org/t/p/w185";
  const notImage =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.dreamstime.com%2F%25C3%25A1rbol-cerca-del-r%25C3%25ADo-paisaje-esc%25C3%25A9nico-de-la-naturaleza-image131862406&psig=AOvVaw08mPJHYY-LD0ZORgDPEKCO&ust=1645823436302000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMiJ6qqgmfYCFQAAAAAdAAAAABAJ";

  const { user } = useContext(UserContext);

  const removeFav = function (id) {
    alert("Movie removed from favorites");
    axios
      .delete(`/api/favoritos/${user.id}/${id.movieId}`)
      .then((res) => res.data)
      .then(() => {
        console.log("The movie was removed");
      });
  };

  return (
    <section>
      <ul>
        {favoritos?.map((data) => (
          <section key={data.id} className="layout">
            <div className="is-flex">
              <img
                src={data.imgUrl ? `${baseURL}${data.imgUrl}` : notImage}
                alt=""
                style={{ width: "300px", height: "450px" }}
              />
              <div className=" div_single p-4 is-flex  is-flex-direction-column is-justify-content-space-around ">
                <p className=" singleTitle is-size-1">{data.title}</p>
                <div>
                  <p>
                    <strong className="strong">Description:</strong>{" "}
                    {data.description}
                  </p>
                </div>
              </div>
              <div>
                {user.id ? (
                  <button className="button" onClick={() => removeFav(data)}>
                    <p>
                      Remove <GrFavorite />
                    </p>
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </section>
        ))}
      </ul>
    </section>
  );
};

export default ContentFavourites;
