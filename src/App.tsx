import React, { useEffect } from "react";
import "./App.css";
import axiosInstance from "./api";
import { Movie } from "./types";
import { Card, Dropdown, Pagination } from "./components";

function App() {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [marvelId, setMarvelId] = React.useState<number | null>(null);
  const [dcId, setDcId] = React.useState<number | null>(null);
  const [isMarvelSelected, setIsMarvelSelected] = React.useState<boolean>(true);
  const [isDcSelected, setIsDcSelected] = React.useState<boolean>(true);

  useEffect(() => {
    const getMarvelCompanyId = async () => {
      const movies = await axiosInstance.get(
        "https://api.themoviedb.org/3/search/company?api_key=c6eac87b4d5ef2d48c48b629ce0c8f18&query=Marvel Studios"
      );
      setMarvelId(movies.data.results[0].id);
      console.warn(movies.data.results[0].id);
      return movies.data.results[0].id;
    };
    const getDcCompanyId = async () => {
      const movies = await axiosInstance.get(
        "https://api.themoviedb.org/3/search/company?api_key=c6eac87b4d5ef2d48c48b629ce0c8f18&query=DC Entertainment"
      );
      setDcId(movies.data.results[0].id);
      console.warn(movies.data.results[0].id);
      return movies.data.results[0].id;
    };

    const getAll = async () => {
      const marvelId = await getMarvelCompanyId();
      const dcId = await getDcCompanyId();
      // await getAxiosInstance(`${marvelId}|${dcId}`);
    };
    getAll();
  }, []);

  useEffect(() => {
    const getAxiosInstance = async (withCompany: string) => {
      const movies = await axiosInstance.get(
        `https://api.themoviedb.org/3/discover/movie?with_companies=${withCompany}&page=2&api_key=c6eac87b4d5ef2d48c48b629ce0c8f18`
      );
      setMovies(movies.data.results);
    };
    console.warn(`${marvelId}|${dcId}`);
    getAxiosInstance(
      `${isMarvelSelected ? marvelId : ""}|${isDcSelected ? dcId : ""}`
    );
  }, [marvelId, dcId, isMarvelSelected, isDcSelected]);

  return (
    <div className="App">
      <Dropdown />
      {/* <div>
        <div
          onClick={() => {
            setIsMarvelSelected(!isMarvelSelected);
          }}
        >
          Marvel
        </div>
        <div
          onClick={() => {
            setIsDcSelected(!isDcSelected);
          }}
        >
          Dc
        </div>
      </div> */}
      {movies.map((item: Movie) => (
        <Card key={item.id} movie={item} />
      ))}
      <Pagination />
    </div>
  );
}

export default App;
