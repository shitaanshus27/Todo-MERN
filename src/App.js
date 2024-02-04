import "./App.css";
import CreateTodo from "./components/CreateTodo";
import Todos from "./components/Todos";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <CreateTodo />
      </BrowserRouter>
    </div>
  );
}

export default App;
