import express from 'express';
import cors from 'cors';
import ConnectDatabase from './connect.js'
import authRoutes from './routes/authRoutes.js'

const app = express();



//MIDLEWARE
app.use(express.json());
app.use(cors());


//Dbconnection
ConnectDatabase();

//globalerror handler
app.use((err, req, res, next) => {
   err.statuCode = res.statusCode || 500;
   err.status = err.status || "error";
   res.status(err.statuCode).json({
    status:err.status,
    message:err.message,
   })
});

//Routes
app.use('/api/users', authRoutes);


app.get('/', (req, res) => {
    res.send('Server is running...');
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});