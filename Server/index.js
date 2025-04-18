import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDatabase from './connect.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from "cookie-parser";
import verifyToken from './Middleware/authMiddleware.js';
import Productroutes from './routes/ProductRoutes.js';
import Products from './routes/Getproducts.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5173", // for local frontend
    "https://find-it-olive.vercel.app"
  ],
  credentials: true,
}));




app.use(express.urlencoded({ extended: true }));


ConnectDatabase();


app.use('/api/users', authRoutes);
app.use('/addproducts', Productroutes);
app.use('/getproducts', Products);

app.get('/', verifyToken, async (req, res) => {
  try {
    res.json({
      user: req.user ? {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
      } : null,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data" });
  }
});


app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  if (process.env.NODE_ENV === 'development') {
    console.error(err);
    res.status(500).json({ error: err.message, stack: err.stack });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
