import React, { useEffect, useRef } from "react";

const AnimeModal = ({
  anime,
  onClose,
  onAddToFavorites,
  onRemoveFromFavorites,
  isFavorite,
}) => {
  const modalRef = useRef(null);
  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="modal-content flex-col md:flex-row overflow-auto flex bg-slate-100 p-4 rounded-md w-[82%] h-[85%] md:w-[70%] md:h-[80%]"
      >
        <div className="mr-4">
          <img
            className="mb-4 w-[280px] md:w-[230px] h-auto"
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
          />
          <p>
            <span><strong>Rating:</strong></span> {anime.rating || "Desconhecido"}
          </p>
          <p>
            <span><strong>Score:</strong></span> {anime.score || "N/A"}
          </p>
          <p>
            <span><strong>Episodes:</strong></span> {anime.episodes || "N/A"}
          </p>
          <p>
            <span><strong>Status:</strong></span> {anime.status || "N/A"}
          </p>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold pb-4 pt-4 md:pt-0">{anime.title}</h2>

          <p className="text-sm md:text-base">{anime.synopsis}</p>

          <div className="py-4">
            {isFavorite ? (
              <button
                onClick={() => onRemoveFromFavorites(anime.mal_id)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
              >
                Remove from Favorites
              </button>
            ) : (
              <button
                onClick={() => onAddToFavorites(anime)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
              >
                Add to Favorites
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeModal;
