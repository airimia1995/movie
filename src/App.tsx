import React, { useEffect } from "react";
import "./App.css";
import { IMovie, ISortDirection } from "./types";
import {
  Card,
  Dropdown,
  FilterByCompany,
  SortDirection,
  Pagination,
} from "./components";
import { getCompanyIds, getSortedMovies } from "./api/MovieApi";
import { sorters } from "./types/constants";

function App() {
  const [movies, setMovies] = React.useState<IMovie[]>([]);
  const [marvelId, setMarvelId] = React.useState<number | null>(null);
  const [dcId, setDcId] = React.useState<number | null>(null);
  const [isMarvelSelected, setIsMarvelSelected] = React.useState<boolean>(true);
  const [isDcSelected, setIsDcSelected] = React.useState<boolean>(true);
  const [sortBy, setSortBy] = React.useState<string>("");
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [sortDirection, setSortDirection] =
    React.useState<ISortDirection>("desc");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchId = async () => {
      try {
        const companyIds = await getCompanyIds();
        companyIds?.forEach((company) => {
          if (company.marvelId) {
            setMarvelId(company.marvelId);
          } else {
            setDcId(company.dcId);
          }
        });
        const urlParams = new URLSearchParams(window.location.search);
        setSortBy(urlParams.get("sortBy") as string);
        setSortDirection(urlParams.get("sortDirection") as ISortDirection);
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchId();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const movies = await getSortedMovies(
          `${isMarvelSelected ? marvelId : ""}|${isDcSelected ? dcId : ""}`,
          sortBy,
          sortDirection,
          pageNumber + 1
        );

        const url = new URL(window.location as any);
        sortBy && url.searchParams.set("sortBy", sortBy);
        sortDirection && url.searchParams.set("sortDirection", sortDirection);
        window.history.pushState(null, "", url.toString());

        setMovies(movies);
      } catch (e: any) {
        setError(e.message);
      }
      setLoading(false);
    };
    fetchMovies();
  }, [
    marvelId,
    dcId,
    isMarvelSelected,
    isDcSelected,
    sortBy,
    sortDirection,
    pageNumber,
  ]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App p-4">
      {error && <div className="bg-red-500">{error}</div>}
      <div className="flex grow justify-center">
        <Dropdown
          onSelect={(id) => {
            setSortBy(id);
          }}
          sortBy={sortBy}
          sorters={sorters}
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
      {movies.map((item: IMovie) => (
        <Card key={item.id} movie={item} />
      ))}
      <div className="flex justify-center grow">
        <Pagination
          pageIndex={pageNumber}
          pageCount={100}
          setPageIndex={(item) => {
            setPageNumber(item);
          }}
        />
      </div>
    </div>
  );
}

export default App;
