import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import userRoutes from "./routes/user.routes.js";

// Load environment variables
dotenv.config({path: path.resolve('./.env')});

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB function
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected:", conn.connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};


// Middlewares
app.use(express.json());

app.use(cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Routes
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.use("/api/user", userRoutes);

// Call DB and then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
