import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";

// Get All Items
// route POST /addItem
const allItems = asyncHandler(async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add Item
// route POST /addItem
const addItem = asyncHandler(async (req, res) => {
  try {
    const { todo } = req.body;
    const item = await Item.create({ todo });
    if (item) {
      res.status(201).json({
        message: "item added",
        item,
      });
    } else {
      throw new Error("invalid");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// delete Item
// route POST /delete:id
const deleteItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Item.deleteOne({ id });
    if (result.deletedCount === 1) {
      res.status(200).json({ message: "item deleted successfully" });
    } else {
      res.status(404).json({ message: "item not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Item
// route Put /update:id
const UpdateItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  try {
    if (item) {
      item.todo = req.body.todo || item.todo;
    }
    const updateItem = await item.save();
    res.status(200).json({
      _id: updateItem._id,
      todo: updateItem.todo,
    });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});

// Get Single Item
// route get /item:id
const getItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  try {
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "item not Found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { allItems, addItem, deleteItem, UpdateItem, getItem };
