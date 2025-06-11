import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/DbConnect.js";
import LoginRoute from "./Routes/LoginRoute.js";
import TaskRoute from './Routes/TaskRoute.js'
import SignUpRoute from './Routes/SignUpRoute.js';



const app = express();

app.use(cors());

dotenv.config({ path: ".env" });


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));



connectDB();

app.use("/login",LoginRoute);

app.use("/home",TaskRoute);

app.use("/signup",SignUpRoute)




app.listen(3000, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})