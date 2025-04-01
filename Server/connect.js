import mongoose from "mongoose";
import 'dotenv/config';
const uri = process.env.MONGO_DB_URI;

const ConnectDatabase = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error(" MongoDB Connection Error:", error);
        process.exit(1);  
    }
};

export default ConnectDatabase;
