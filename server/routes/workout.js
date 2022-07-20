const express = require("express");
const router = express.Router();
const { 
  createWorkout, 
  getWorkout, 
  getWorkouts,
  deleteWorkout,
  updateWorkout 
} = require("../controllers/workoutController");

// get all workout
router.get("/", getWorkouts);

// get single workout
router.get("/:id", getWorkout);

// post a workout
router.post("/", createWorkout);

// post a workout
router.delete("/:id", deleteWorkout);

// post a workout
router.patch("/:id", updateWorkout);

module.exports = router;