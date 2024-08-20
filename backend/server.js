import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
import itemRoutes from "./routes/itemRoutes.js";
import connectDB from "./config/db.js";

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", itemRoutes);

app.listen(port, () => console.log("server is ready on port 5000"));
