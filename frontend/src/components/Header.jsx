import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import {
  useGetSingleItemQuery,
  useUpdateItemMutation,
} from "../slices/ItemSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: items, refetch } = useGetSingleItemQuery(id);
  const [UpdateItem] = useUpdateItemMutation();
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (items) {
      setTodo(items.todo);
    }
  }, [items]);

  const handleUpdateItem = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const res = await UpdateItem({ id, updatedItem: { todo } }).unwrap();
      await refetch();
      dispatch({ type: "item/updateSuccess", payload: res }); // Replace with appropriate action
      setTodo(""); // Clear the form field
      navigate("/");
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };
  return (
    <Form>
      <Form.Group className="mb-3" controlId="item">
        <Form.Label>Update Item</Form.Label>
        <Form.Control
          type="text"
          placeholder="Update Todo"
          value={todo || ""}
          onChange={(e) => setTodo(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleUpdateItem}>
        Submit
      </Button>
    </Form>
  );
};

export default Header;
