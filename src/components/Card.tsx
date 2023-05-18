import { Movie } from "../types";

const Card = ({ movie }: { movie: Movie }) => {
  return (
    <div className="border-2 mb-5 flex bg-slate-300 p-4">
      <img
        src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
        alt={movie.title}
        className="pe-4"
      />
      <div className="flex flex-col grow">
        <h1 className="font-bold">{movie.title}</h1>
        <p className="font-semibold	sm:text-sm">{`Release date: ${movie.release_date}`}</p>
        <p className="text-left mt-5">{movie.overview}</p>
      </div>
      <div>
        <div className="bg-red-500 rounded-full p-2">{movie.vote_average}</div>
      </div>
    </div>
  );
};

export default Card;
