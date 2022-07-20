require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRouter = require("./routes/workout");

// init app
const app = express();

// middleware
app.use(express.json());

// routes
app.use("/api/workouts/", workoutRouter);

// db connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Connected to the database");
      console.log(`Listening for requests on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log(err.message);
  });