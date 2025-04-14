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
  const getItemDetailsbyid = async(req,res)=>{
    try {
      const { id } = req.params;
      const lostitem = await Lostitemdb.findById(id);
      if(lostitem){
        return res.json({ type: 'lost', item: lostitem });
      }
      const foundItem = await FoundItemdb.findById(id);
      if (foundItem) {
        return res.json({ type: 'found', item: foundItem });
      }
      res.status(404).json({ error: 'Item not found in any collection' });
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
export default {getAllLostItems,getAllFoundItems,getItemDetailsbyid}