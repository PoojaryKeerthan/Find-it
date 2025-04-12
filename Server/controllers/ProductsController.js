import cloudinary from '../Config/Cloudinary.js'
import FoundItemdb from '../models/FoundItems.js';
import Lostitemdb from '../models/LostItems.js';
const foundproducts = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'find-it/Founditems',
            },
            async (err, result) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                const imageUrl = result.secure_url;
                const {
                    ProductName,
                    Contact,
                    Location,
                    Address,
                    Category,
                    Description,
                    Condition,
                    Reported,
                    Date,
                    UserId,
                } = req.body;
                const newFoundItem = new FoundItemdb({
                    ProductName,
                    Contact,
                    Location,
                    Address,
                    Category,
                    Description,
                    Date,
                    Condition:Condition,
                    Reported:Reported,
                    ImageURL: imageUrl,
                    Status: false,
                    user:UserId,
                })
                await newFoundItem.save();
                res.status(201).json({
                    success: true,
                    message: "Found item added successfully",
                    data: newFoundItem
                });
            }
        );
        stream.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

const lostproducts = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: 'find-it/Lostitems',
            },
            async (err, result) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                const imageUrl = result.secure_url;
                const {
                    ProductName,
                    Contact,
                    Location,
                    Address,
                    Category,
                    Description,
                    Date,
                    UserId,
                } = req.body;
                const newLostItem = new Lostitemdb({
                    ProductName,
                    Contact,
                    Location,
                    Address,
                    Category,
                    Description,
                    Date,
                    ImageURL: imageUrl,
                    Status: false,
                    user:UserId,
                });
                await newLostItem.save();
                res.status(201).json({
                    success: true,
                    message: "Lost item added successfully",
                    data: newLostItem
                });
            },
        );
        stream.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export default { foundproducts, lostproducts }