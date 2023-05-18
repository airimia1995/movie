import React, { useEffect } from "react";
import "./App.css";
import axiosInstance from "./api";
import { Movie } from "./types";
import {
  Card,
  Dropdown,
  FilterByCompany,
  SortDirection,
  Pagination,
} from "./components";
import {
  getCompanyIds,
  getDcCompanyId,
  getMarvelCompanyId,
  getSortedMovies,
} from "./api/MovieApi";

function App() {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [marvelId, setMarvelId] = React.useState<number | null>(null);
  const [dcId, setDcId] = React.useState<number | null>(null);
  const [isMarvelSelected, setIsMarvelSelected] = React.useState<boolean>(true);
  const [isDcSelected, setIsDcSelected] = React.useState<boolean>(true);
  const [sortBy, setSortBy] = React.useState<string>("");
  const [sortDirection, setSortDirection] = React.useState<"desc" | "asc">(
    "desc"
  );
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchId = async () => {
      try {
        const companyIds = await getCompanyIds();
        console.warn("companyIds", companyIds);
        companyIds?.forEach((company) => {
          if (company.marvelId) {
            setMarvelId(company.marvelId);
          } else {
            setDcId(company.dcId);
          }
        });
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchId();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const movies = await getSortedMovies(
          `${isMarvelSelected ? marvelId : ""}|${isDcSelected ? dcId : ""}`,
          sortBy,
          sortDirection
        );
        setMovies(movies);
      } catch (e: any) {
        setError(e.message);
      }
    };
    fetchMovies();
  }, [marvelId, dcId, isMarvelSelected, isDcSelected, sortBy, sortDirection]);

  return (
    <div className="App p-4">
      <div className="flex grow justify-center">
        <Dropdown
          onSelect={(id) => {
            setSortBy(id);
          }}
          sortBy={sortBy}
          sorters={[
            { label: "Release Date", id: "release_date" },
            { label: "Audience rating", id: "vote_average" },
          ]}
        />
        <SortDirection
          sortDirection={sortDirection}
          onChange={(type) => {
            setSortDirection(type);
          }}
        />
      </div>
      <FilterByCompany
        onClickMarvel={() => {
          setIsMarvelSelected(!isMarvelSelected);
        }}
        onClickDc={() => {
          setIsDcSelected(!isDcSelected);
        }}
        isDcSelected={isDcSelected}
        isMarvelSelected={isMarvelSelected}
      />
      {movies.map((item: Movie) => (
        <Card key={item.id} movie={item} />
      ))}
      <Pagination />
    </div>
  );
}

export default App;
