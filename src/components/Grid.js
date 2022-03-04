import { Link } from "react-router-dom";
import Card from "../commons/Card";

const Grid = ({ movies }) => {
  return (
    <section>
      <div className="columns is-multiline layout">
        {movies?.map((pelicula) => (
          <div className="column is-3" key={pelicula.id}>
            <Link to={`${pelicula.id}`}>
              <Card pelicula={pelicula} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Grid;
