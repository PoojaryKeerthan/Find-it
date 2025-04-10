import express from 'express';
import cors from 'cors';
import ConnectDatabase from './connect.js'
import authRoutes from './routes/authRoutes.js'
import cookieParser from "cookie-parser";
import verifyToken from './Middleware/authMiddleware.js';
import Productroutes from './routes/ProductRoutes.js'
const app = express();



//MIDLEWARE
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,  
  })
);

app.use(express.urlencoded({ extended: true }));

//Dbconnection
ConnectDatabase();

//Routes
app.use('/api/users', authRoutes);
app.use('/addproducts',Productroutes);

app.get('/',verifyToken, async(req, res) => {
  try {
    // const products = await Product.find(); // Fetch all products
    res.json({
        user: req.user ? { id: req.user.id,name: req.user.name, email: req.user.email } : null,
    });
} catch (error) {
    res.status(500).json({ message: "Error fetching data" });
}
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});