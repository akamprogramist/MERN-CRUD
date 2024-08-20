import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "../slices/apiSlice";

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const status = useSelector((state) => state.items.status);

  useEffect(() => {
    const fetchItems = async () => {
      dispatch(setStatus("loading"));
      try {
        const response = await fetch("/api/items");
        const data = await response.json();
        dispatch(setItems(data));
        dispatch(setStatus("succeeded"));
      } catch (err) {
        dispatch(setError(err.message));
        dispatch(setStatus("failed"));
      }
    };

    fetchItems();
  }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error loading items</div>;

  return (
    <Form>
      <Form.Group className="mb-3" controlId="item">
        <Form.Label>Create Item</Form.Label>
        <Form.Control type="Item" placeholder="Enter Item" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Form.Group className="mt-5" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label={`${item.todo}`} />
      </Form.Group>
    </Form>
  );
};

export default ItemList;
