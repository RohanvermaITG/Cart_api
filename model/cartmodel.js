import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const CartSchema = new mongoose.Schema({
  _productid: {
    type: String,
    default: uuidv4,
  },
  name: String,
  price: Number,
  quantity: Number,
});


const cartmodule = mongoose.model("Cart", CartSchema);
export default cartmodule; // default export
