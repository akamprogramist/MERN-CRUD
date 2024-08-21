import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const port = process.env.PORT;
import itemRoutes from "./routes/itemRoutes.js";
import connectDB from "./config/db.js";

connectDB();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use("/", itemRoutes);

app.listen(port, () => console.log("server is ready on port 5000"));
