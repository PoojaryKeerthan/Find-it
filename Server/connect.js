import mongoose from "mongoose";

const uri = "mongodb+srv://Keerthan:KeerthanDb@cluster0.pyjtf.mongodb.net/todoDB?retryWrites=true&w=majority&appName=Cluster0";

const ConnectDatabase = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        process.exit(1);  
    }
};

export default ConnectDatabase;
