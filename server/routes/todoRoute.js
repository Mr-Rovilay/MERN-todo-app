import express from "express";
import todoController from "../controllers/todoController.js";

const router = express();

router.post("/", todoController.postTodo);
router.get("/", todoController.getTodo);
router.put("/:id", todoController.putTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
