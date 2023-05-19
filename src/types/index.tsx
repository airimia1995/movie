export type IMovie = {
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
};

export interface IMovieResponse {
  results: IMovie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export class MovieResponse implements IMovieResponse {
  results: IMovie[] = [];
  total_pages: number = 0;
  total_results: number = 0;
  page: number = 0;
}

export type ISortDirection = "desc" | "asc";

export enum SortTypeEnum {
  Title = "title",
  ReleaseDate = "release_date",
  VoteAverage = "vote_average",
  Overview = "overview",
  None = "",
}
