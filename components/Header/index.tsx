'use client';

import Annoucement from './Annoucement';
import Backdrop from './Backdrop';
import Search from './Search';

const Header = () => {
  return (
    <header className="mt-4 flex flex-col items-center">
      <div className="mb-6 mt-2 flex w-full flex-col items-center justify-between gap-4 md:flex-row md:items-baseline">
        <h1 className="text-3xl font-black select-none">
          kanban<span className="text-4xl">.</span>
        </h1>
        <div className="flex w-full items-center md:w-auto">
          <Backdrop />
          <Search />
        </div>
      </div>

      <Annoucement />
    </header>
  );
};

export default Header;
