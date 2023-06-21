import { UserCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import useBoardStore from '../../store/boardStore';
import fetchSuggestion from '../../utils/fetchSuggestion';

const Annoucement = () => {
  const { board } = useBoardStore();

  const [loading, setLoading] = useState<boolean>(true);
  const [suggestion, setSuggestion] = useState<string>('');

  useEffect(() => {
    if (board.columns.size === 0) return;

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };

    fetchSuggestionFunc();
  }, [board]);

  if (board.columns.size === 0) return null;

  return (
    <div className="glassmorphism flex w-fit items-center gap-3 rounded-md px-4 py-2">
      <UserCircleIcon className="h-10 w-10 shrink-0 text-slate-700" />
      <p className="text-slate-700">
        {loading ? 'Calculating...' : suggestion}
      </p>
    </div>
  );
};

export default Annoucement;
