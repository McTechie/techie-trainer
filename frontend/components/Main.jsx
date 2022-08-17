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
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/workouts', {
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
          {!workouts?.length && <div className='bg-white dark:bg-neutral-800 dark:text-slate-400 border-gray-50 text-neutral-600 text-center p-5 rounded-lg shadow-md'>
            <h4 className='font-bold text-primary mr-2 mb-3 text-lg md:text-2xl'>
              No workouts yet
            </h4>
            <p className='mt-10 mb-4'>
              I&apos;ll leave tomorrow&apos;s problems to tomorrow&apos;s me, and today&apos;s workout to today&apos;s me!
            </p>
          </div>}
        </div>
        <div className='col-span-4 md:col-span-2 xl:col-span-2'>
          <WorkoutForm selectedWorkout={selectedWorkout} setSelectedWorkout={setSelectedWorkout} />
        </div>
      </>
    </main>
  );
}
 
export default Main;