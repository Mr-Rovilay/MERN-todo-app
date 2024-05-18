import Todo from "../models/Todo.js";

const getTodo = async (req, res) => {
  try {
    const todos = await Todo.find({});
    if (todos.length === 0) {
      return res.status(404).json({ message: "No Task found" });
    }
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postTodo = async (req, res) => {
  try {
    const task = req.body.task;
    if (!task) {
      return res.status(400).json({ message: "Task description is required" });
    }
    const todo = new Todo({
      task: task,
    });
    const newTodo = await todo.save();
    // 201 is create
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const putTodo = async (req, res) => {
  try {
    const id = req.params.id;
    const { task, completed } = req.body;

    const updateData = {};
    if (task !== undefined) updateData.task = task;
    if (completed !== undefined) updateData.completed = completed;

    const updatedTodo = await Todo.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    if (!todoId) {
      return res.status(400).json({ message: "ID is required" });
    }

    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { deleteTodo, putTodo, postTodo, getTodo };
