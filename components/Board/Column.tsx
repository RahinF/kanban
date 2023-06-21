import { PlusCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import useBoardStore from '../../store/boardStore';
import useModalStore from '../../store/modalStore';
import Card from './Card';

interface Props {
  id: TypedColumn;
  todos: Todo[];
  index: number;
}

const Column = ({ id, todos, index }: Props) => {
  const { searchQuery, setNewTaskType } = useBoardStore();
  const { openModal } = useModalStore();

  const handleAddTodo = () => { 
    setNewTaskType(id)
    openModal()
   }
  return (
    <Draggable
      draggableId={id}
      index={index}
    >
      {({ dragHandleProps, draggableProps, innerRef }) => (
        <div
          {...dragHandleProps}
          {...draggableProps}
          ref={innerRef}
        >
          <Droppable
            droppableId={index.toString()}
            type="card"
          >
            {(
              { droppableProps, innerRef, placeholder },
              { isDraggingOver }
            ) => (
              <div
                {...droppableProps}
                ref={innerRef}
                className={clsx(
                  'rounded-md  p-4',
                  'bg-opacity-40 bg-clip-padding',
                  'transition duration-200 ease-in',
                  {
                    'bg-green-300': isDraggingOver,
                    'bg-white': !isDraggingOver,
                  }
                )}
              >
                <div className="flex justify-between">
                  <h2 className="font-medium capitalize">{id}</h2>
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-sm">
                    {!searchQuery
                      ? todos.length
                      : todos.filter((todo) =>
                          todo.title
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        ).length}
                  </span>
                </div>

                <div className="my-4 flex flex-col gap-2">
                  {todos.map((todo, index) => {
                    if (
                      searchQuery &&
                      !todo.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                      return null;

                    return (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}
                      >
                        {({ dragHandleProps, draggableProps, innerRef }) => (
                          <Card
                            todo={todo}
                            index={index}
                            id={id}
                            dragHandleProps={dragHandleProps}
                            draggableProps={draggableProps}
                            innerRef={innerRef}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {placeholder}
                </div>
                <div className="flex justify-end">
                  <button onClick={handleAddTodo}>
                    <PlusCircleIcon className="h-8 w-8 text-green-300" />
                  </button>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
