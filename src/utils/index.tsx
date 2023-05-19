import { IMovie, ISortDirection } from "../types";

const sortMovieAlphabeticallyByOverview = (
  movies: IMovie[],
  direction: ISortDirection
) => {
  return movies.sort((a, b) => {
    if (
      direction === "asc" ? a.overview < b.overview : a.overview > b.overview
    ) {
      return -1;
    }
    if (
      direction === "asc" ? a.overview > b.overview : a.overview < b.overview
    ) {
      return 1;
    }
    return 0;
  });
};

export { sortMovieAlphabeticallyByOverview };
