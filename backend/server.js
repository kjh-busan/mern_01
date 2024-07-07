const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(
  express.json({
    extended: false,
  })
);
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// API Server List
app.use("/api/todos", require("./routes/api/todos"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/signup", require("./routes/api/signup"));
