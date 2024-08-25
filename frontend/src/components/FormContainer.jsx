import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  useGetAllItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} from "../slices/ItemApi";

const ItemList = () => {
  const { data } = useGetAllItemsQuery();
  const [deleteItem] = useDeleteItemMutation();
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const [addItem] = useAddItemMutation();

  const handleAddItem = async () => {
    try {
      const res = await addItem({ todo }).unwrap();
      dispatch({ ...res });
    } catch (err) {
      console.error("Error adding new item:", err);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteItem(itemId).unwrap();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  return (
    <Form onSubmit={handleAddItem}>
      <Form.Group className="mb-3" controlId="item">
        <Form.Label>Create Item</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

      <Form.Group className="mt-5" controlId="formBasicCheckbox">
        {data?.map((p) => (
          <div className="d-flex" key={p._id}>
            <LinkContainer to={`/items/${p._id}`}>
              <Button>Update</Button>
            </LinkContainer>
            <Button variant="danger" onClick={() => handleDeleteItem(p._id)}>
              Delete
            </Button>
            <h1>{p.todo}</h1>
          </div>
        ))}
      </Form.Group>
    </Form>
  );
};

export default ItemList;
