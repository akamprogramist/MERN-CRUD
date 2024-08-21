import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { useDispatch } from "react-redux";

// import { useGetAllProductQuery } from "../slices/dummy";
import {
  useGetAllItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} from "../slices/ItemSlice";

const ItemList = () => {
  const { data: items } = useGetAllItemsQuery();

  const [deleteItem] = useDeleteItemMutation();

  const [todo, setTodo] = useState("");

  const dispatch = useDispatch();

  const [addItem] = useAddItemMutation();

  // const { data } = useGetAllProductQuery();

  const handleAddProduct = async () => {
    try {
      const res = await addItem({ todo }).unwrap();
      dispatch({ ...res });
      setTodo("");
    } catch (err) {
      console.error("Error adding new product:", err);
    }
  };

  const handleDeleteItem = async (ItemId) => {
    try {
      await deleteItem(ItemId).unwrap();
    } catch (err) {
      console.error("Error delete product:", err);
    }
  };

  return (
    <Form onSubmit={handleAddProduct}>
      <Form.Group className="mb-3" controlId="item">
        <Form.Label>Create Item</Form.Label>
        <Form.Control
          type="Item"
          placeholder="Enter Todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Form.Group className="mt-5" controlId="formBasicCheckbox">
        {/* <div>
          {data?.products.map((p) => (
            <h1 key={p.id}>{p.title}</h1>
          ))}
        </div> */}
        {items?.map((p) => (
          <div className="d-flex" key={p._id}>
            <Button variant="success">update</Button>
            <Button variant="danger" onClick={() => handleDeleteItem(p._id)}>
              delete
            </Button>
            <h1>{p.todo}</h1>
          </div>
        ))}
      </Form.Group>
    </Form>
  );
};

export default ItemList;
