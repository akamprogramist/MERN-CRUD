import express from "express";
const router = express.Router();
import {
  allItems,
  addItem,
  deleteItem,
  UpdateItem,
  getItem,
} from "../controllers/itemController.js";

router.get("/items", allItems);
router.post("/items", addItem);
router.delete("/items/:id", deleteItem);
router.get("/items/:id", getItem);
router.put("/items/:id", UpdateItem);

export default router;
