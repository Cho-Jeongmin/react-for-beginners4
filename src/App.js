import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    //API documentation: https://yts.mx/api
    fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=8.0&sort_by=year"
    )
      .then((response) => response.json())
      .then((json) => setMovies(json.data.movies));
  }, []);
  console.log(movies);
  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
