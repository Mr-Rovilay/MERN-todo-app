import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BsCircleFill,
  BsFillCheckCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";
import Create from "./Create";
import { url } from "../App";
import AOS from "aos";
import "aos/dist/aos.css";

Modal.setAppElement("#root");

const Home = () => {
  const [todo, setTodo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: null, task: "" });

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    AOS.init();
  }, []);

  const fetchTodos = async () => {
    try {
      const result = await axios.get(url + "/todo");
      setTodo(result.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleCreate = async (newTask) => {
    try {
      await axios.post(url + "/todo", { task: newTask });
      fetchTodos();
      toast.success("Task created successfully");
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("Failed to create task");
    }
  };

  const handleEdit = async (id, newTask) => {
    try {
      const taskToEdit = todo.find((item) => item.id === id);
      if (taskToEdit && taskToEdit.completed) {
        throw new Error("Task cannot be updated when marked as completed");
      }

      await axios.put(url + `/todo/${id}`, { task: newTask });
      fetchTodos();
      toast.success("Task updated successfully");
      closeModal();
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/todo/${id}`);
      fetchTodos();
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task");
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      if (completed) {
        throw new Error("Task cannot be updated when marked as completed");
      }

      await axios.put(url + `/todo/${id}`, { completed: !completed });
      fetchTodos();
      toast.success("Task status updated successfully");
    } catch (error) {
      console.error("Failed to update task status:", error);
      toast.error(error.message);
    }
  };

  const openModal = (id, task) => {
    setCurrentTask({ id, task });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTask({ id: null, task: "" });
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    handleEdit(currentTask.id, currentTask.task);
  };

  return (
    <div className="mt-16 p-4 md:p-20 rounded-md bg-[#1a1a40]">
      <h1 className="capitalize text-white text-3xl mb-8">Todo List</h1>
      <Create onCreate={handleCreate} />
      {todo.length === 0 ? (
        <h1 className="capitalize text-white text-3xl">No records</h1>
      ) : (
        todo.map((item) => (
          <div className="todo mt-3" data-aos="fade-left" key={item._id}>
            <div
              className="capitalize flex gap-4 items-center"
              onClick={() => handleToggleComplete(item._id, item.completed)}
            >
              {item.completed ? (
                <BsFillCheckCircleFill className="icon cursor-pointer text-dark-green" />
              ) : (
                <BsCircleFill className="icon cursor-pointer" />
              )}
              <p className={item.completed ? "completed text-2xl" : "text-2xl"}>
                {item.task}
              </p>
            </div>

            <div className="flex gap-2 items-center">
              {!item.completed && (
                <div
                  className="edit-icon text-dark-green text-2xl"
                  onClick={() => openModal(item._id, item.task)}
                >
                  <span className="icon cursor-pointer">✎</span>
                </div>
              )}

              <div
                className="delete-icon text-red text-2xl cursor-pointer"
                onClick={() => handleDelete(item._id)}
              >
                <span className="icon">
                  <BsFillTrashFill />
                </span>
              </div>
            </div>
          </div>
        ))
      )}
      <ToastContainer />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Task"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-2xl">Edit Task</h2>
        <form onSubmit={handleModalSubmit}>
          <input
            type="text"
            className="w-full my-6 p-5 border border-[#21d4b9] text-2xl"
            value={currentTask.task}
            onChange={(e) =>
              setCurrentTask({ ...currentTask, task: e.target.value })
            }
          />
          <div className="flex items-center justify-center gap-4">
            <button
              className="bg-[#21d4b9] hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded"
              type="submit"
            >
              Save
            </button>
            <button
              className="bg-[#21d4b9] hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Home;
