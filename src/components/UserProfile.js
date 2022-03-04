import { PeopleContext } from "../context/PeopleContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";



const Mapeo = function ({ movies }) {
  const baseURL = "https://image.tmdb.org/t/p/w185";
  const notImage =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.dreamstime.com%2F%25C3%25A1rbol-cerca-del-r%25C3%25ADo-paisaje-esc%25C3%25A9nico-de-la-naturaleza-image131862406&psig=AOvVaw08mPJHYY-LD0ZORgDPEKCO&ust=1645823436302000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMiJ6qqgmfYCFQAAAAAdAAAAABAJ";

  return (
    <section className="favorites">
      
      <div className="columns is-multiline layout ">
      
        {movies?.map((data) => (
          <div className="column is-3" key={data.id}>
            <div>
              <div className="card">
                <div className="card-image ">
                
                  <figure className="image column has-text-centered">
                    <img
                      className="is-inline-block"
                      src={data.imgUrl ? `${baseURL}${data.imgUrl}` : notImage}
                      alt=""
                      style={{ width: "210px", height: "270px" }}
                    />
                    <p className=" singleTitle is-size-4">{data.title}</p>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const UserProfile = function () {
  const people = useContext(PeopleContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/people/${people.people.id}/movies`)
      .then((res) => res.data)
      .then((result) => {
        setMovies(result);
      });
  }, [people.people.id]);

  return (
    <div className="layoutPerfil">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {people.people.id ? (
        <div className="perfil">
          <h2 className="mail">FAVORITE MOVIES</h2>
          <h1 className="nombre">{people.people.completeName}</h1>
          <h2 className="mail">{people.people.email}</h2>
          
          <Mapeo movies={movies} />
        </div>
      ) : (
        <div>
          <h1>USUARIO NO ENCONTRADO</h1>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
