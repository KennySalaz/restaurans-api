import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true , unique: true },
  products: { type: [String], required: false },
  type: { type: String, required: true },
  reviews: { type: [String], required: false },
  timestamp: { type: Date, default: Date.now },
});

const Menu = mongoose.model("restaurants", menuSchema);

export default Menu;
