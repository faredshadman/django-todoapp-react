import axios from "axios";
import { ListGroup, Button, Modal, FormControl } from "react-bootstrap";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import { useState } from "react";
const TodoList = ({ todos = [], setTodos, notifyFor }) => {
  const [show, setShow] = useState(false);
  const [showDel, setShowDel] = useState(false);
  const [record, setRecord] = useState(null);
  const [name, setName] = useState("");
  const handleClose = () => setShow(false);
  const handleCloseDel = () => setShowDel(false);
  const handleShow = () => setShow(true);
  const handleShowDel = () => setShowDel(true);
  const handleCompleted = async (todo) => {
    try {
      const { data } = await axios.patch(`/api/todos/${todo.id}/`, {
        completed: !todo.completed,
      });
      const newTodos = todos.filter((todo) => todo.id !== data.id);
      setTodos([data, ...newTodos]);
      notifyFor("success", "Todo updated successfully");
    } catch (err) {
      notifyFor("error", "Something went wrong");
      console.log(err);
    }
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      if (name.trim() === "")
        return notifyFor("error", "Todo title is required");
      const { data } = await axios.patch(`/api/todos/${record.id}/`, {
        name: name,
      });
      const newTodos = todos.filter((todo) => todo.id !== data.id);
      setTodos([data, ...newTodos]);
      handleClose();
      notifyFor("success", "Todo updated successfully");
    } catch (err) {
      console.log(err);
      notifyFor("error", "Something went wrong");
      handleClose();
    }
  };
  const handleChange = (e) => setName(e.target.value);
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/todos/${record.id}/`);
      const newTodos = todos.filter((todo) => todo.id !== record.id);
      setTodos([...newTodos]);
      notifyFor("success", "Todo deleted successfully");
      handleCloseDel();
    } catch (err) {
      notifyFor("error", "Something went wrong");
      handleCloseDel();
      console.log(err);
    }
  };
  const completedTodos = todos.filter((todo) => todo.completed);
  const uncompletedTodos = todos.filter((todo) => !todo.completed);

  const RenderListGroupItem = (todo) => {
    return (
      <ListGroup.Item
        className="d-flex justify-content-between align-items-center"
        key={todo.id}>
        <div className="d-flex justify-content-center">
          <span
            onClick={() => handleCompleted(todo)}
            style={{
              cursor: "pointer",
              marginRight: "12px",
            }}>
            {todo.completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </span>
          <span>{todo.name}</span>
        </div>

        <div>
          <MdEdit
            onClick={() => {
              handleShow();
              setRecord(todo);
            }}
            style={{
              cursor: "pointer",
              marginRight: "12px",
            }}
          />
          <MdDelete
            onClick={() => {
              handleShowDel();
              setRecord(todo);
            }}
            style={{
              cursor: "pointer",
            }}
          />
        </div>
      </ListGroup.Item>
    );
  };
  return (
    <>
      <div>
        <h3>Completed Todos {completedTodos.length}</h3>
      </div>
      <ListGroup className="mb-5">
        {completedTodos.map(RenderListGroupItem)}
      </ListGroup>
      <div>
        <h3>Uncompleted Todos {uncompletedTodos.length}</h3>
      </div>

      <ListGroup className="mb-5">
        {uncompletedTodos.map(RenderListGroupItem)}
      </ListGroup>

      <Modal show={showDel} onHide={handleCloseDel}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDel}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete todo
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            type="text"
            placeholder="New Todo"
            onChange={handleChange}
            defaultValue={record?.name}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoList;
