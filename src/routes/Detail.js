import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie.js";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  console.log(movie);
  const getDownloads = (downloads) => {
    if (downloads > 1000000) return `${(downloads / 1000000).toFixed(1)}M+`;
    else if (downloads > 1000) return `${(downloads / 1000).toFixed(1)}K+`;
  };
  return (
    <div>
      {loading ? (
        <h3>loading...</h3>
      ) : (
        <div>
          <img src={movie.background_image} />
          <img src={movie.medium_cover_image} />
          <h1>{movie.title}</h1>
          <h3>{movie.year}</h3>
          <ul>
            <li>
              runtime: {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
            </li>
            <li>rating: {movie.rating}</li>
            <li>downloads: {getDownloads(movie.download_count)}</li>
          </ul>
          <p>{movie.description_full}</p>
          <ul>
            {movie.genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
