"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchButton() {
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center justify-end">
      <div
        className={`flex items-center overflow-hidden rounded-full border transition-all duration-300 ${
          expanded
            ? "w-[260px] border-white/20 bg-white/10 shadow-lg shadow-black/10"
            : "w-11 border-white/10 bg-white/5"
        }`}
      >
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="grid size-11 shrink-0 place-items-center text-white transition hover:bg-white/5"
          aria-label={expanded ? "Close search" : "Open search"}
        >
          {expanded ? <X size={16} /> : <Search size={16} />}
        </button>

        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onBlur={() => setExpanded(false)}
          placeholder="Search shops..."
          className={`bg-transparent text-sm text-white placeholder:text-slate-300 outline-none transition-all duration-300 ${
            expanded ? "w-full pr-4 opacity-100" : "w-0 opacity-0"
          }`}
        />
      </div>
    </div>
  );
}