import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import {
  useGetSingleItemQuery,
  useUpdateItemMutation,
} from "../slices/ItemApi";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: items } = useGetSingleItemQuery(id);
  const [UpdateItem] = useUpdateItemMutation();
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (items) {
      setTodo(items.todo);
    }
  }, [items]);

  const handleUpdateItem = async (event) => {
    event.preventDefault();
    try {
      const res = await UpdateItem({ id, updatedItem: { todo } }).unwrap();
      dispatch({ type: "item/updateSuccess", ...res }); // to remove the type error
      setTodo("");
      navigate("/");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };
  return (
    <Form onSubmit={handleUpdateItem}>
      <Form.Group className="mb-3" controlId="item">
        <Form.Label>Update Item</Form.Label>
        <Form.Control
          type="text"
          placeholder="Update Todo"
          value={todo || ""}
          onChange={(e) => setTodo(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default UpdateContainer;
