import React, { useState } from 'react'
import { useWorkoutContext } from "../hooks/UseWorkoutContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    const workout = { title, load, reps }
    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = await response.json();
    if(!response.ok){
      setError(json.err);
      setEmptyFields(json.emptyFields);
    }
    if(response.ok){
      setEmptyFields([]);
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      dispatch({type: "CREATE_WORKOUT", payload: json});
    }
  };
  return(
    <div className="workout-form">
      <form onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>
        {error && <div className='error'>{error}</div>}
        <label>Excercise Title: </label>
        <input 
          type="text"
          onChange={e => setTitle(e.target.value)}
          value={title}
          className={ emptyFields.includes("title") ? "input-error": "" }
          />

        <label>Excercise Load: </label>
        <input 
          type="number"
          onChange={e => setLoad(e.target.value)}
          value={load}
          className={ emptyFields.includes("load") ? "input-error": "" }
          />

        <label>Excercise Reps: </label>
        <input 
          type="number"
          onChange={e => setReps(e.target.value)}
          value={reps}
          className={ emptyFields.includes("reps") ? "input-error": "" }
          />

        <button>Add Workout</button>
      </form>
    </div>
  );
};

export default WorkoutForm;