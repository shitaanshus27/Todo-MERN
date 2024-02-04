import React from "react";
import Todos from "./Todos";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import NewTodo from "./NewTodo";
// import Todos from "./NewTodos";

const CreateTodo = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/getTodos" element={<Todos />}></Route>
        <Route path="/createTodos" element={<NewTodo />}></Route>
        <Route path="/" element={<NewTodo />}></Route>
      </Routes>
    </div>
  );
};

export default CreateTodo;
