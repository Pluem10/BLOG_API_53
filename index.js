const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const e = require("cors");

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;
const BASE_URL = process.env.BASE_URL;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: BASE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.get("/", (req, res) => {
  res.send("Hello welcome to Blog API");
});

// Connect to MongoDB  ต่อ database
if (!DB_URL) {
  console.error("DB_URL is missing. Please set it in the .env file.");
} else {
  mongoose
    .connect(DB_URL)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
      console.error("MongDB connection error:", error);
    });
}

app.listen(PORT, () => {
  console.log("server running on port http://localhost:" + PORT);
});
