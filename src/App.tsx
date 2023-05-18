import React, { useEffect } from "react";
import "./App.css";
import axiosInstance from "./api";
import { Movie } from "./types";
import { Card } from "./components";

function App() {
  const [movies, setMovies] = React.useState<Movie[]>([]) as any[];
  useEffect(() => {
    const getAxiosInstance = async () => {
      const movies = await axiosInstance.get(
        "https://api.themoviedb.org/3/discover/movie?with_companies=DC&page=2&api_key=c6eac87b4d5ef2d48c48b629ce0c8f18"
      );
      console.log(movies);
      setMovies(movies.data.results);
    };
    getAxiosInstance();
  }, []);

  
  return (
    <div className="App">
      {movies.map((item: Movie) => (
        <Card key={item.id} movie={item} />
      ))}
    </div>
  );
}

export default App;
