const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// ================= CONNECT DB =================
connectDB()
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => {
    console.log("MongoDB Connection Failed ❌", err);
  });

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));

// ONLY USE THIS IF FILE EXISTS
// app.use("/api/comments", require("./routes/commentRoutes"));

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});