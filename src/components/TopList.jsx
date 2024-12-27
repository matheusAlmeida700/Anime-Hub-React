import React, { useState, useEffect } from "react";
import AnimeCard from "./AnimeCard";
import AnimeModal from "./AnimeModal";
import Header from "./Header";
import { fetchTopAnimes, searchAnimeByQuery } from "../utils/api";

const TopList = () => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedAnime, setSelectedAnime] = useState(null); 
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadTopAnimes = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchTopAnimes();
        setAnimes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTopAnimes();

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleAddToFavorites = (anime) => {
    const updatedFavorites = [...favorites, anime];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    closeModal();
  };

  const handleRemoveFromFavorites = (animeId) => {
    const updatedFavorites = favorites.filter((anime) => anime.mal_id !== animeId);
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
    <>
      <Header onSearch={handleSearch} />
      {loading && <h2 className="text-center">Loading...</h2>}
      {error && <h2 className="text-center text-red-500">{error}</h2>}
      <div className="pt-32 md:pt-20 flex items-center justify-center flex-wrap m-2">
        {animes.map((anime) => (
          <div key={anime.mal_id} className="relative">
            <AnimeCard
              anime={anime}
              onClick={() => setSelectedAnime(anime)}
              isFavorite={favorites.some((fav) => fav.mal_id === anime.mal_id)}
              onAdd={handleAddToFavorites}
              onRemove={handleRemoveFromFavorites}
            />
          </div>
        ))}
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
    </>
  );
};

export default TopList;
