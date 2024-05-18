import { useState } from "react";

const Create = ({ onCreate }) => {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    onCreate(task);
    setTask("");
  };

  return (
    <div className="w-full mb-13">
      <input
        className="todo-input"
        type="text"
        placeholder="Enter Task"
        required
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        type="button"
        onClick={handleAdd}
        className="bg-[#21d4b9] hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded"
      >
        Add
      </button>
    </div>
  );
};

export default Create;
