import React, { useState } from "react";
import Logo from "../assets/logo.png";
import { Search } from "lucide-react";

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <header className="fixed w-full z-50 py-2 px-0 bg-slate-950 top-0">
      <nav className="flex flex-col md:flex-row gap-4 justify-between items-center py-2 px-6">
        <div className="flex items-center gap-4">
          <img
            className="w-12 bg-white rounded-full p-1"
            src={Logo}
            alt="Logo"
          />
          <div className="flex gap-4">
            <a className="text-white text-xl" href="/top">
              Top Animes
            </a>
            <a className="text-white text-xl" href="/favorites">
              My List
            </a>
          </div>
        </div>
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
          <input
            className="h-7 rounded p-4 outline-none"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Anime name"
          />
          <button
            className="text-white hover:text-zinc-200 transition-colors"
            type="submit"
          >
            <Search />
          </button>
        </form>
      </nav>
    </header>
  );
};

export default Header;
