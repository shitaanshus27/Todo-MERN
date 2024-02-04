const express = require("express");
const router = express.Router();

const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/Todos");

router.post("/createTodo", createTodo);
router.get("/getAllTodos", getAllTodos);
router.get("/getTodo/:id", getTodoById);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;
