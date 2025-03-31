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

// ensure routes are listed AFTER app.listen()

console.log("Available Routes:");
app._router.stack.forEach((layer) => {
    if (layer.route) {
        console.log(`Route:${layer.route.path}-Methods:${Object.keys(layer.route.methods).join(",").toUpperCase()}`)
    } else if (layer.name === "router") {
        layer.handle.stack.forEach((subLayer) => {
            if (subLayer.route) {
                console.log(`Route:${subLayer.route.path}-Methods:${Object.keys(subLayer.route.methods).join(",").toUpperCase()}`)
            }
        })
    }

})
