import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SearchBar = ({ query, setQuery }) => {
  const searchRef = useRef();

  useEffect(() => {
    gsap.from(searchRef.current, {
      opacity: 1,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
    }); 
  }, []);

  return (
    <div ref={searchRef} className="mb-4">
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
};

export default SearchBar;
