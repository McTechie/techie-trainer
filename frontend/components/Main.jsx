import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useWorkouts } from '../hooks/useWorkouts';
import WorkoutCard from './WorkoutCard';
import WorkoutForm from './WorkoutForm';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Main = () => {
  const { data, error } = useSWR('http://localhost:4000/api/workouts', fetcher);
  const { workouts, dispatch } = useWorkouts();
  
  const [selectedWorkout, setSelectedWorkout] = useState({});

  useEffect(() => {
    if (data) {
      dispatch({ type: 'SET_WORKOUTS', payload: data });
    }
  }, [data]);

  return (
    <main
      className='px-10 py-8 md:px-16 xl:px-32 lg:py-12 max-w-screen-2xl grid grid-cols-4 xl:grid-cols-5 gap-10 lg:gap-12'
    >
      {error ? (
        <p>Failed to load</p>
      ) : !data ? (
        <p>Loading...</p>
      ) : (<>
        <div className='col-span-4 md:col-span-2 xl:col-span-3 space-y-4'>
          {workouts && workouts.map(workout => (
            <WorkoutCard key={workout._id} workout={workout} setSelectedWorkout={setSelectedWorkout} />
          ))}
        </div>
        <div className='col-span-4 md:col-span-2 xl:col-span-2'>
          <WorkoutForm selectedWorkout={selectedWorkout} setSelectedWorkout={setSelectedWorkout} />
        </div>
      </>)}
    </main>
  );
}
 
export default Main;