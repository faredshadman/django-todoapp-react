import { Navbar, Container } from "react-bootstrap";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import SpinnerWrapper from "./components/Spinner";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const notifyFor = (type, message) => {
  toast[type](`${message}`, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

const App = () => {
  const [todos, setTodos] = useState([]);
  console.log(todos);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    axios
      .get("api/todos/")
      .then((res) => {
        setLoading(true);
        setError(null);
        setTodos(res.data);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <div>
      <Navbar bg="light" style={{ marginBottom: "1.25rem" }}>
        <Container>
          <Navbar.Brand href="#">Todo App</Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <TodoForm notifyFor={notifyFor} setTodos={setTodos} />
        {loading ? <SpinnerWrapper /> : null}
        {error ? <p>Error</p> : null}
        {todos.length === 0 ? (
          <p>No todos</p>
        ) : (
          <>
            <TodoList todos={todos} setTodos={setTodos} notifyFor={notifyFor} />
          </>
        )}
      </Container>
      <ToastContainer />
    </div>
  );
};

export default App;
