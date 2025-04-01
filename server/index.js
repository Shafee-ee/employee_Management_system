import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';
import dotenv from "dotenv";
import connectToDatabase from './db/db.js';


const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
connectToDatabase();
console.log("Auth Router:", authRouter);
app.use('/api/auth', authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on PORT ${process.env.PORT}`)
});

