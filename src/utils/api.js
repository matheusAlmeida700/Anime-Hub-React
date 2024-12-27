const API_URL = "https://api.jikan.moe/v4";

export const fetchTopAnimes = async () => {
  const response = await fetch(`${API_URL}/top/anime`);
  if (!response.ok) throw new Error("Erro ao buscar animes");
  const { data } = await response.json();
  return data;
};

export const searchAnimeByQuery = async (query) => {
  const response = await fetch(`${API_URL}/anime?q=${query}&limit=1`);
  if (!response.ok) throw new Error("Erro ao buscar anime");
  const { data } = await response.json();
  if (data.length === 0) throw new Error("Nenhum anime encontrado.");
  return data[0];
};
