import React from "react";

const AnimeCard = ({ anime, onClick, isFavorite, onAdd, onRemove }) => (
  <div
    key={anime.mal_id}
    onClick={onClick} 
    className="relative hover:scale-105 transition-transform cursor-pointer max-w-[340px] md:max-w-[270px] m-4 text-white flex items-start flex-col justify-start"
  >
    <img
      className="w-[280px] md:w-[230px]"
      src={anime.images.jpg.large_image_url}
      alt={anime.title}
    />
    
    {!isFavorite && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAdd(anime);
        }}
        className="absolute top-2 right-2 bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-blue-900 transition-colors"
      >
        Add to Favorites
      </button>
    )}

    {isFavorite && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(anime.mal_id);
        }}
        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-700 transition"
      >
        Remove
      </button>
    )}
  </div>
);

export default AnimeCard;
