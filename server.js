const express = require("express");
const mongoose = require("mongoose");

// bringing in routes
const users = require("./routes/api/users");
const profiles = require("./routes/api/profile");

const app = express();

//DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello"));

// Using routes
app.use("/api/users", users);
app.use("/api/profile", profiles);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
