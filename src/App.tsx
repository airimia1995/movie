import React, { useCallback, useEffect } from "react";
import "./App.css";
import {
  IMovie,
  IMovieResponse,
  ISortDirection,
  MovieResponse,
  SortTypeEnum,
} from "./types";
import {
  Card,
  Dropdown,
  FilterByCompany,
  SortDirection,
  Pagination,
} from "./components";
import { getCompanyIds, getSortedMovies } from "./api/MovieApi";
import { sorters } from "./types/constants";
import { sortMovieAlphabeticallyByOverview } from "./utils";

function App() {
  const [movieResponse, setMovieResponse] = React.useState<IMovieResponse>(
    new MovieResponse()
  );

  const [marvelId, setMarvelId] = React.useState<number | null>(null);
  const [dcId, setDcId] = React.useState<number | null>(null);

  const [isMarvelSelected, setIsMarvelSelected] = React.useState<boolean>(true);
  const [isDcSelected, setIsDcSelected] = React.useState<boolean>(true);

  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [sortBy, setSortBy] = React.useState<SortTypeEnum>(SortTypeEnum.None);

  const [sortDirection, setSortDirection] =
    React.useState<ISortDirection>("desc");

  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const getValuesFromUrl = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlSortDirection = urlParams.get("sortDirection");
    const urlSortBy = urlParams.get("sortBy");
    urlSortBy && setSortBy(urlParams.get("sortBy") as SortTypeEnum);
    urlSortDirection &&
      setSortDirection(urlParams.get("sortDirection") as ISortDirection);
  }, []);

  useEffect(() => {
    const fetchId = async () => {
      try {
        const companyIds = await getCompanyIds();
        companyIds?.forEach((company) => {
          if (company.marvelId) {
            setMarvelId(company.marvelId);
          } else if (company.dcId) {
            setDcId(company.dcId);
          }
        });
        getValuesFromUrl();
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchId();
  }, [getValuesFromUrl]);

  const addValuesToUrl = useCallback(() => {
    const url = new URL(window.location as any);
    sortBy && url.searchParams.set("sortBy", sortBy);
    sortDirection && url.searchParams.set("sortDirection", sortDirection);
    window.history.pushState(null, "", url.toString());
  }, [sortBy, sortDirection]);

  useEffect(() => {
    if (!(marvelId || dcId)) return;
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const movieResponse = await getSortedMovies(
          `${isMarvelSelected ? marvelId : ""}|${isDcSelected ? dcId : ""}`,
          sortBy === SortTypeEnum.Overview ? "" : sortBy, // When sortBy is overview, we don't need to pass sortBy to the api, we will to it in the client side
          sortDirection,
          pageNumber + 1
        );

        if (sortBy === SortTypeEnum.Overview) {
          const results = sortMovieAlphabeticallyByOverview(
            movieResponse.results,
            sortDirection
          ); // This approach will not take in consideration the page number from the api and will sort only the movies from the current page
          movieResponse.results = results;
        }

        addValuesToUrl();
        setMovieResponse(movieResponse);
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
    addValuesToUrl,
    sortBy,
    sortDirection,
    pageNumber,
  ]);

  return (
    <div>
      {loading && (
        <div className="fixed h-full w-full bg-teal-500 bg-opacity-25 z-50 flex justify-center items-center">
          Loading...
        </div>
      )}
      <div className="App p-4 relative">
        {error && <div className="bg-red-500">{error}</div>}
        <div className="flex grow justify-center">
          <Dropdown<SortTypeEnum>
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
        <div className="flex justify-end grow">
          <Pagination
            pageIndex={pageNumber}
            pageCount={movieResponse.total_pages}
            setPageIndex={(item) => {
              setPageNumber(item);
            }}
          />
        </div>
        {movieResponse.results.map((item: IMovie) => (
          <Card key={item.id} movie={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
