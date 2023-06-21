import { XCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from 'react-beautiful-dnd';
import useBoardStore from '../../store/boardStore';
import getUrl from '../../utils/getUrl';

interface Props {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const Card = ({
  todo,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) => {
  const { deleteTask } = useBoardStore();

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };

      fetchImage();
    }
  }, [todo]);

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="glassmorphism rounded-md px-5 py-4"
    >
      <div className="group flex items-center justify-between">
        <p className="text-gray-900">{todo.title}</p>
        <button onClick={() => deleteTask(index, todo, id)}>
          <XCircleIcon className="h-8 w-8 text-red-300 opacity-0 transition duration-150 ease-in group-hover:opacity-100" />
        </button>
      </div>

      {/* add image */}
      {imageUrl && (
        <div className="my-2">
          <Image
            src={imageUrl}
            alt={`${todo.title} image`}
            width={400}
            height={200}
            className="w-full rounded-md object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default Card;
