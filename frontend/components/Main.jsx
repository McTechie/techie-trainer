import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useWorkouts } from '../hooks/useWorkouts';
import WorkoutCard from './WorkoutCard';
import WorkoutForm from './WorkoutForm';

const Main = () => {
  const { user } = useAuth();
  const { workouts, dispatch } = useWorkouts();
  
  const [selectedWorkout, setSelectedWorkout] = useState({});

  useEffect(() => {
    const fetchWorkouts = async () => {
      const res = await fetch('http://localhost:4000/api/workouts', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      const data = await res.json();

      if (res.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: data });
      }
    }

    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  return (
    <main
      className='px-10 py-8 md:px-16 xl:px-32 lg:py-12 max-w-screen-2xl grid grid-cols-4 xl:grid-cols-5 gap-10 lg:gap-12'
    >
      <>
        <div className='col-span-4 md:col-span-2 xl:col-span-3 space-y-4'>
          {workouts?.map(workout => (
            <WorkoutCard key={workout._id} workout={workout} setSelectedWorkout={setSelectedWorkout} />
          ))}
        </div>
        <div className='col-span-4 md:col-span-2 xl:col-span-2'>
          <WorkoutForm selectedWorkout={selectedWorkout} setSelectedWorkout={setSelectedWorkout} />
        </div>
      </>
    </main>
  );
}
 
export default Main;