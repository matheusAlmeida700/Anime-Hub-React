import React, { useState, useEffect } from "react";
import AnimeCard from "./AnimeCard";
import AnimeModal from "./AnimeModal";
import Header from "./Header";
import { searchAnimeByQuery } from "../utils/api";

const FavoritesList = () => {
  const [favorites, setFavorites] = useState([]);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemoveFromFavorites = (animeId) => {
    const updatedFavorites = favorites.filter((anime) => anime.mal_id !== animeId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    closeModal();
  };

  const handleAddToFavorites = (anime) => {
    const updatedFavorites = [...favorites, anime];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    closeModal();
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setError("");
    try {
      const anime = await searchAnimeByQuery(query);
      setSelectedAnime(anime);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setSelectedAnime(null);

  return (
    <div>
      <Header onSearch={handleSearch} />
      {loading && <h2 className="text-center">Loading...</h2>}
      {error && <h2 className="text-center text-red-500">{error}</h2>}

      <div className="pt-32 md:pt-20 flex items-center justify-center flex-wrap m-2 flex-col">
        <h1 className="text-center text-3xl font-semibold text-white mb-6">My Favorite Animes</h1>
        <div className="flex items-center justify-center flex-wrap m-2">
          {favorites.length > 0 ? (
            favorites.map((anime) => (
              <div key={anime.mal_id} className="relative">
                <AnimeCard
                  anime={anime}
                  onClick={() => setSelectedAnime(anime)}
                  isFavorite={true}
                  onAdd={handleAddToFavorites}
                  onRemove={handleRemoveFromFavorites}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-white">No favorites yet.</p>
          )}
        </div>
        {selectedAnime && (
          <AnimeModal
            anime={selectedAnime}
            onClose={closeModal}
            onAddToFavorites={handleAddToFavorites}
            onRemoveFromFavorites={handleRemoveFromFavorites}
            isFavorite={favorites.some((fav) => fav.mal_id === selectedAnime.mal_id)}
          />
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
