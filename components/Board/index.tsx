'use client';

import { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import useBreakpoint from '../../hooks/useBreakpoint';
import useBoardStore from '../../store/boardStore';
import Column from './Column';

const Board = () => {
  const { board, getBoard, setBoard, updateTodoInDB } = useBoardStore();

  const isMobile = useBreakpoint('md');

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    // if dragged outside of board
    if (!destination) return;

    // if column is dragged
    if (type === 'column') {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedColumns = new Map(entries);
      setBoard({ ...board, columns: rearrangedColumns });
    }

    // handle card drag
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];

    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };

    const finishCol: Column = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };

    if (!startCol || !finishCol) return;

    // if card is dropped in the same position
    if (source.index === destination.index && startCol === finishCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      // same column drag
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol: Column = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      setBoard({ ...board, columns: newColumns });
    } else {
      // dragging to another column
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol: Column = {
        id: startCol.id,
        todos: newTodos,
      };

      newColumns.set(startCol.id, newCol);
      newColumns.set(finishCol.id, {
        id: finishCol.id,
        todos: finishTodos,
      });

      updateTodoInDB(todoMoved, finishCol.id);
      setBoard({ ...board, columns: newColumns });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable
        droppableId="board"
        direction={isMobile ? 'vertical' : 'horizontal'}
        type="column"
      >
        {({ droppableProps, innerRef }) => (
          <div
            {...droppableProps}
            ref={innerRef}
            className="m-auto mt-4 grid max-w-7xl gap-4 md:grid-cols-3"
          >
            {Array.from(board.columns.entries()).map(
              ([id, { todos }], index) => (
                <Column
                  key={id}
                  id={id}
                  todos={todos}
                  index={index}
                />
              )
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
