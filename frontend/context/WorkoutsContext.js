import { createContext, useReducer } from 'react';

export const WorkoutsContext = createContext();

export const workoutsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      };
    case 'CREATE_WORKOUT':
      return {
        workouts: [action.payload, ...state.workouts]
      };
    case 'UPDATE_WORKOUT':
      const { data, createdAt, _id } = action.payload;

      return {
        workouts: state.workouts.map(workout =>
          (workout._id === _id)
          ? ({ title: data.title, load:data.load, sets: data.sets, reps: data.reps, createdAt, _id })
          : workout
        )
      };
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(workout => workout._id !== action.payload._id)
      }
    default:
      return state;
  }
}

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutsReducer, { workouts: null });

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  )
}