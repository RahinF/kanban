import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { ChangeEvent } from 'react';
import useBoardStore from '../../store/boardStore';

const Search = () => {
  const { searchQuery, setSearchQuery } = useBoardStore();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  return (
    <form className="glassmorphism flex flex-1 items-center gap-2 rounded-md px-4 py-2">
      <MagnifyingGlassIcon className="h-6 w-6 text-slate-700" />
      <input
        type="text"
        className="h-10 bg-transparent px-2 outline-none placeholder:text-slate-700 placeholder-shown:text-sm"
        placeholder="Search"
        value={searchQuery}
        onChange={handleOnChange}
      />
      <button
        type="submit"
        className="hidden"
      >
        search
      </button>
    </form>
  );
};

export default Search;
