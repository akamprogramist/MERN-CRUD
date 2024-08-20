import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("items", itemSchema);

export default Item;
