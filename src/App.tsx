import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axiosInstance from './api';

type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
function App() {
  const [movies, setMovies] = React.useState<Movie[]>([]) as any[];
  useEffect(() => {
    const getAxiosInstance = async () => { 
      const movies = await axiosInstance.get('https://api.themoviedb.org/3/discover/movie?api_key=c6eac87b4d5ef2d48c48b629ce0c8f18')
      console.log(movies)
    } 
    getAxiosInstance();
  }, []);
  return (
    <div className="App">
      <header className=" flex flex-column">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
