const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userMiddleware  = require("./middleWare/middleware");
const authRouter = require("./authRoutes/route");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json()); 

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MongoDB is connected!");
});

app.use('/auth', authRouter);

app.get("/protected", userMiddleware, (req, res) => {
  const { username } = req.user;
  res.send(`This is a Protected Route. Welcome ${username}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
