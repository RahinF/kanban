'use client';

import { Dialog, Transition } from '@headlessui/react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { FormEvent, Fragment } from 'react';
import useBoardStore from '../../store/boardStore';
import useModalStore from '../../store/modalStore';
import TaskType from './TaskType';

const Modal = () => {
  const { isOpen, closeModal } = useModalStore();
  const {
    newTaskInput,
    setNewTaskInput,
    newTaskType,
    image,
    setImage,
    addTask,
  } = useBoardStore();

  const imageOnChange = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    if (!target.files?.length) return;

    const file: File = target.files[0];

    if (!file.type.startsWith('image/')) return;

    setImage(file);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTaskInput) return;

    // add task
    addTask(newTaskInput, newTaskType, image);

    setImage(null);
    closeModal();
  };

  return (
    // Use the `Transition` component at the root level
    <Transition
      appear
      show={isOpen}
      as={Fragment}
    >
      <Dialog
        as="form"
        onClose={closeModal}
        className="relative z-50"
        onSubmit={handleSubmit}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="glassmorphism w-full max-w-md transform overflow-auto rounded-md bg-white p-6 text-left align-middle transition-all">
                <Dialog.Title
                  as="h3"
                  className="pb-2 text-center text-lg font-medium leading-6"
                >
                  Add a Task
                </Dialog.Title>

                <div className="glassmorphism mt-2 rounded-md">
                  <input
                    type="text"
                    value={newTaskInput}
                    onChange={(event) => setNewTaskInput(event.target.value)}
                    placeholder="Enter a task here..."
                    className=" w-full bg-transparent p-4 placeholder:text-slate-700 placeholder-shown:text-sm"
                  />
                </div>
                <TaskType />

                <div>
                  {image && (
                    <Image
                      src={URL.createObjectURL(image)}
                      alt="image preview"
                      width={200}
                      height={200}
                      className="mb-4 h-auto w-full cursor-not-allowed transition hover:grayscale"
                      onClick={() => setImage(null)}
                    />
                  )}
                  <label
                    htmlFor="file"
                    className="glassmorphism flex cursor-pointer items-center justify-center gap-2 rounded-md py-2 capitalize text-gray-900"
                  >
                    <PhotoIcon className="h-8 w-8" />
                    <span className="text-sm font-medium">upload image</span>
                  </label>
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={imageOnChange}
                  />
                </div>

                {newTaskInput && (
                  <div>
                    <button className="glassmorphism mt-4 w-full rounded-md p-3 font-medium capitalize transition duration-150 ease-in hover:bg-green-300 hover:text-white">
                      add task
                    </button>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
