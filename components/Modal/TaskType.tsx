import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import useBoardStore from '../../store/boardStore';

interface Types {
  id: TypedColumn;
  name: string;
  description: string;
}

const types: Types[] = [
  {
    id: 'todo',
    name: 'Todo',
    description: 'A new task to be completed.',
  },
  {
    id: 'underway',
    name: 'Underway',
    description: 'A task that is currently being worked on.',
  },
  {
    id: 'complete',
    name: 'Complete',
    description: 'A task that has been completed.',
  },
];

const TaskType = () => {
  const { newTaskType, setNewTaskType } = useBoardStore();

  return (
    <div className="w-full py-8">
      <div className="w-full">
        <RadioGroup
          value={newTaskType}
          onChange={setNewTaskType}
        >
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {types.map((type) => (
              <RadioGroup.Option
                key={type.id}
                value={type.id}
                className={({ active, checked }) =>
                  `${
                    active
                      ? ` ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300`
                      : ''
                  }
                    ${checked ? `text-white` : ''}
                    relative flex cursor-pointer rounded-md bg-white bg-opacity-40 px-5 py-4 backdrop-blur-sm backdrop-filter focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={clsx(['font-medium text-gray-900'], {})}
                          >
                            {type.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline text-gray-900`}
                          >
                            <span>{type.description}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0">
                          <CheckCircleIcon className="h-6 w-6 text-green-300" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default TaskType;
