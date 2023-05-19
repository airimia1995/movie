import { useState } from "react";
import { IMovie } from "../types";

const Card = ({ movie }: { movie: IMovie }) => {
  const [imageError, setImageError] = useState(false);
  return (
    <div className="border-2 mb-5 flex bg-slate-300 p-4 flex-col sm:flex-row">
      {!imageError && (
        <img
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt={movie.title}
          onError={(e) => {
            setImageError(true);
          }}
          className="w-100 md:w-32 lg:w-48 pe-4"
        />
      )}
      <div className="flex flex-col grow">
        <h1 className="font-bold">{movie.title || ""}</h1>
        <p className="font-semibold">{`Release date: ${
          movie.release_date || ""
        }`}</p>
        <p className="text-left mt-5">{movie.overview || ""}</p>
      </div>
      <div className="justify-center flex">
        <div className="bg-red-500 rounded-full p-2 w-10 h-10">
          {movie.vote_average}
        </div>
      </div>
    </div>
  );
};

export default Card;
