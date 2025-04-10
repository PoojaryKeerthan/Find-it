import { Schema } from "mongoose";
import mongoose from "mongoose";

const FoundItemSchema = new mongoose.Schema({
    ProductName : { type: String, required: true },
    Contact : { type: Number, required: true },
    Location : { type: String, required: true },
    Address : { type: String, required: true },
    Category : { type: String, required: true },
    Description : { type: String, required: true },
    ImageURL : { type: String, required: true },
    Date : { type: String, required: true },
    Condition : { type: String, required: true },
    Reported : { type: String, required: true },
    Status: { type: Boolean, default: false },
},{ timestamps: true })

const FoundItemdb = mongoose.model("FoundItems", FoundItemSchema); 

export default FoundItemdb;