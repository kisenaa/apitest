import { useCallback, useEffect, useState } from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';
import { MdCancel, MdDoneAll } from 'react-icons/md';
import Swal from 'sweetalert2';

import { prng } from '@/components/gen';

import Navbar from './Navbar';

import { taskProps } from '@/types/task';
const Dashboard = () => {
  // Multiple Tasks
  const [task, setTask] = useState<taskProps[]>([]);

  useEffect(() => {
    const taskList = localStorage.getItem('taskList');
    if (taskList) {
      setTask(JSON.parse(taskList));
    }
  }, []);

  // Input Form Task
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    completed: false,
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (todo.title) {
        e.preventDefault();
        const hashing = prng();
        const newTask = [
          ...task,
          {
            title: todo.title,
            description: todo.description,
            completed: todo.completed,
            id: `PO-${hashing.toFixed(10)}`,
          },
        ];
        setTask(newTask);
        setTodo({ title: '', description: '', completed: false });
        localStorage.setItem('taskList', JSON.stringify(newTask));
      }
    },
    [task, todo],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  const handleComplete = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
      e.preventDefault();
      const updatedTask = [...task];
      updatedTask[index].completed = !updatedTask[index].completed;
      setTask(updatedTask);
      localStorage.setItem('taskList', JSON.stringify(updatedTask));
    },
    [task],
  );

  const handleRemove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
      e.preventDefault();
      const updatedTask = [...task];
      updatedTask.splice(index, 1);
      setTask(updatedTask);
      localStorage.setItem('taskList', JSON.stringify(updatedTask));
    },
    [task],
  );

  const handleEdit = useCallback(
    async (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      index: number,
    ) => {
      const { value: type } = await Swal.fire({
        title: 'Edit text',
        icon: 'info',
        input: 'select',
        inputOptions: {
          title: 'Title',
          description: 'Description',
        },
        inputPlaceholder: 'Select',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to choose something!';
          }
        },
      });

      if (type) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The feature is on progress !',
        });
      }
    },
    [],
  );

  return (
    <div className="h-screen overflow-auto">
      <div className="flex">
        <div className="max-w-[14vw]">
          <Navbar />
        </div>

        <div className="h-screen w-screen bg-[#faebd7] text-center">
          <div className="mb-3 bg-[#ffe4c4] p-6 text-3xl font-bold">
            ToDo List
          </div>
          <form
            className="mx-auto my-7 flex max-w-[92vw] flex-row justify-center text-left outline-none md:w-[850px]"
            action="handleSubmit"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              className="mx-1 my-0 rounded-md border-none px-7 py-2 text-left outline-none sm:min-w-[310px]"
              style={{
                MozBoxSizing: 'border-box',
                WebkitBoxSizing: 'border-box',
                boxSizing: 'border-box',
              }}
              name="title"
              type="text"
              placeholder="Enter Title"
              value={todo.title}
              onChange={(e) => handleChange(e)}
            />
            <input
              className="mx-1 my-0 rounded-md border-none px-4 py-2 text-left outline-none sm:w-[450px]"
              style={{
                MozBoxSizing: 'border-box',
                WebkitBoxSizing: 'border-box',
                boxSizing: 'border-box',
              }}
              name="description"
              type="text"
              placeholder="Enter Description"
              value={todo.description}
              onChange={(e) => handleChange(e)}
            />
            <button
              className=" mx-1 my-0 rounded-md border-none bg-[#49ff58] px-6 py-3"
              type="submit"
            >
              Add
            </button>
          </form>

          <div className="m-auto mt-[55px] flex max-w-[60vw] flex-wrap rounded-md p-[15px] xl:w-[1100px]">
            {task?.map((tasks, i) => (
              <div
                key={i}
                className="m-[5px] flex justify-between rounded-lg bg-[#ffe4c4] text-left"
                style={{
                  flex: '1 0 40%',
                }}
              >
                <div className="ml-6 px-0 py-[15px]">
                  <div
                    className=" mb-2 text-lg font-bold capitalize text-black"
                    style={{
                      textDecoration: tasks.completed ? 'line-through' : '',
                    }}
                  >
                    {tasks.title}
                  </div>
                  <div
                    className="text-black"
                    style={{
                      textDecoration: tasks.completed ? 'line-through' : '',
                    }}
                  >
                    {tasks.description}
                  </div>
                </div>

                <div
                  className="box-border flex h-full flex-col justify-around gap-2 px-[10x] py-[15px]"
                  style={{
                    borderLeft: '1px solid #8b8b8b',
                  }}
                >
                  <button
                    className="mx-4 my-0 flex cursor-pointer rounded border-none bg-white p-2 align-middle text-[#27ce4b] outline-none hover:bg-[#27ce4b] hover:text-white"
                    onClick={(e) => handleComplete(e, i)}
                  >
                    <MdDoneAll size="18" />
                  </button>
                  <button
                    className="mx-4 my-0 flex cursor-pointer rounded border-none bg-white p-2 align-middle text-blue-500 outline-none hover:bg-blue-500 hover:text-white"
                    onClick={(e) => handleEdit(e, i)}
                  >
                    <BiSolidEditAlt size="18" />
                  </button>
                  <button
                    className="mx-4 my-0 flex cursor-pointer rounded border-none bg-white p-2 align-middle text-red-600 outline-none hover:bg-[#ce2727] hover:text-white"
                    onClick={(e) => handleRemove(e, i)}
                  >
                    <MdCancel size="18" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
