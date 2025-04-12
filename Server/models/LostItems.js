import { Schema } from "mongoose";
import mongoose from "mongoose";

const LostItemSchema = new mongoose.Schema({
    ProductName : { type: String, required: true },
    Contact : { type: Number, required: true },
    Location : { type: String, required: true },
    Address : { type: String, required: true },
    Category : { type: String, required: true },
    Description : { type: String, required: true },
    ImageURL : { type: String, required: true },
    Date : { type: String, required: true },
    Status: { type: Boolean, default: false },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
},{ timestamps: true })

const Lostitemdb = mongoose.model("LostItems", LostItemSchema); 

export default Lostitemdb;