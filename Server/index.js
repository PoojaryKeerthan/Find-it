import express from 'express';
import cors from 'cors';
import ConnectDatabase from './connect.js'
import authRoutes from './routes/authRoutes.js'

const app = express();



//MIDLEWARE
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//Dbconnection
ConnectDatabase();

//Routes
app.use('/api/users', authRoutes);


app.get('/', (req, res) => {
    res.send('Server is running...');
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});