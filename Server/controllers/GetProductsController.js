import Lostitemdb from "../models/LostItems.js";
import FoundItemdb from "../models/FoundItems.js";


const getAllLostItems = async (req, res) => {
    try {
      const items = await Lostitemdb.find(); // Gets all documents in LostItem collection
      res.status(200).json(items);
    } catch (error) {
      console.error('Error fetching lost items:', error);
      res.status(500).json({ message: 'Failed to fetch lost items' });
    }
  };

  const getAllFoundItems = async (req,res)=>{
    try {
      const items = await FoundItemdb.find();
      res.status(200).json(items)
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch lost items' });
    }
  }
export default {getAllLostItems,getAllFoundItems}