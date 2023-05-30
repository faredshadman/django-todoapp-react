import { Form, InputGroup, Button, FormControl } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const TodoForm = ({ notifyFor, setTodos }) => {
  const [name, setName] = useState("");
  const handleChange = (e) => setName(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/todos/",
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setTodos((todos) => [...todos, data]);
      setName("");
      notifyFor("success", "Todo added successfully");
    } catch (err) {
      notifyFor("error", "Something went wrong");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-4">
        <FormControl
          placeholder="New Todo"
          onChange={handleChange}
          value={name}
        />
        <Button variant="primary" type="submit">
          Add Todo
        </Button>
      </InputGroup>
    </Form>
  );
};

export default TodoForm;
