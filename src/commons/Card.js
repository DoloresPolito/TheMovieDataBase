
const Card = ({ pelicula }) => {
  const baseURL = "https://image.tmdb.org/t/p/w185";
  const notImage =
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.dreamstime.com%2F%25C3%25A1rbol-cerca-del-r%25C3%25ADo-paisaje-esc%25C3%25A9nico-de-la-naturaleza-image131862406&psig=AOvVaw08mPJHYY-LD0ZORgDPEKCO&ust=1645823436302000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMiJ6qqgmfYCFQAAAAAdAAAAABAJ";

  return (
    <div>
      <div className="card">
        <div className="card-image ">
          <figure className="image column has-text-centered">
            
              <img
                className="is-inline-block"
                src={
                  pelicula.poster_path
                    ? `${baseURL}${pelicula.poster_path}`
                    : notImage
                }
                alt=""
                style={{ width: "210px", height: "270px" }}
              /> 
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Card;


