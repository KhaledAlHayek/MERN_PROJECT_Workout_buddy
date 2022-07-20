import React, { useEffect, useState } from 'react'
import WorkoutForm from '../components/WorkoutForm';

// components
import WorkoutsDetails from "../components/WorkoutsDetails";
import { useWorkoutContext } from "../hooks/UseWorkoutContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext()
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts/");
      const json = await response.json();
      if(response.ok){
        dispatch({type: "SET_WORKOUTS", payload: json});
      }
    }
    fetchWorkouts();
  }, [dispatch]);

  return(
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map(workout => (
          <WorkoutsDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <div className="add-workout">
        <WorkoutForm />
      </div>
    </div>
  );
};

export default Home;