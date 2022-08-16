import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useWorkouts } from '../hooks/useWorkouts';
import { useAuth } from '../hooks/useAuth';
import { ArrowCircleRightIcon, FireIcon } from '@heroicons/react/solid';

const WorkoutForm = ({ selectedWorkout, setSelectedWorkout }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const { dispatch } = useWorkouts();
  const { user } = useAuth();
  
  const [workoutCreated, setWorkoutCreated] = useState(false);
  const [error, setError] = useState(null);

  const isUpdating = Object.keys(selectedWorkout).length !== 0;

  if (isUpdating) {
    setValue('title', selectedWorkout.title);
    setValue('load', selectedWorkout.load);
    setValue('sets', selectedWorkout.sets);
    setValue('reps', selectedWorkout.reps);
  }

  const onSubmit = async (data) => {
    if (!user) {
      setError('You must be logged in to create a workout');
      return;
    }

    const url = isUpdating
    ? `http://localhost:4000/api/workouts/${selectedWorkout._id}`
    : 'http://localhost:4000/api/workouts';

    const reqMehtod = isUpdating ? 'PATCH' : 'POST';
    
    const res = await fetch(url, {
      method: reqMehtod,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify(data)
    });

    const json = await res.json();
    
    if (!res.ok) {
      setError(json.error);
      setWorkoutCreated(false);
    }
    
    if (res.ok) {
      isUpdating
        ? dispatch({ type: 'UPDATE_WORKOUT', payload: { data, createdAt: selectedWorkout.createdAt, _id: selectedWorkout._id } })
        : dispatch({ type: 'CREATE_WORKOUT', payload: json });

      isUpdating
        ? console.log('Workout updated!')
        : console.log('Workout created!');
      
      setError(null);
      setWorkoutCreated(true);
      setSelectedWorkout({});
      reset();
    }
  };

  return (
    <div className='bg-white dark:bg-neutral-800 p-6 rounded-lg shadow-md'>
      <h4 className='text-primary text-xl text-center font-bold pb-2 mb-2 border-b-primary border-b flex items-center justify-center'>
        Add Workouts <FireIcon className='h-6 ml-2' />
      </h4>
      <form
        className='px-2 pt-3 pb-1 flex flex-col space-y-8'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='space-y-4 md:space-y-2'>
          <div className='form-input-section'>
            <label htmlFor='title' className='form-input-label'>
              Title:
            </label>
            <input
              className='form-input'
              placeholder='Bench Press'
              aria-label='title'
              name='title'
              id='title'
              {...register('title', { required: true, minLength: 3, maxLength: 20, pattern: /^[a-zA-Z0-9 ]+$/ })}
            />
          </div>
          {errors.title && <div className='form-input-error'>Please enter a valid workout title</div>}
        </div>
        
        <div className='space-y-4 md:space-y-2'>
          <div className='form-input-section'>
            <label htmlFor='title' className='form-input-label'>
              Load &#40;in kg&#41;:
            </label>
            <input
              className='form-input'
              placeholder='20'
              aria-label='load'
              name='load'
              id='load'
              type='number'
              {...register('load', { required: true, pattern: /^\d+$/ })}
              />
          </div>
          {errors.load && <div className='form-input-error'>Please enter a valid load</div>}
        </div>

        <div className='space-y-4 md:space-y-2'>
          <div className='form-input-section'>
            <label htmlFor='title' className='form-input-label'>
              Sets:
            </label>
            <input
              className='form-input'
              placeholder='3'
              aria-label='sets'
              name='sets'
              id='sets'
              type='number'
              {...register('sets', { required: true, pattern: /^\d+$/ })}
            />
          </div>
          {errors.sets && <div className='form-input-error'>Please enter the number of sets</div>}
        </div>

        <div className='space-y-4 md:space-y-2'>
          <div className='form-input-section'>
            <label htmlFor='title' className='form-input-label'>
              Reps:
            </label>
            <input
              className='form-input'
              placeholder='10'
              aria-label='reps'
              name='reps'
              id='reps'
              type='number'
              {...register('reps', { required: true, pattern: /^\d+$/ })}
            />
          </div>
          {errors.reps && <div className='form-input-error'>Please enter the number of reps</div>}
        </div>
        
        <button type='submit' className='bg-primary text-white rounded-full font-bold text-sm py-2 flex items-center justify-center'>
          {isUpdating ? 'Update Workout' : 'Create Workout'} <ArrowCircleRightIcon className='h-5 inline-block ml-2' />
        </button>
      </form>
      
      {error && (
        <div className='px-2 py-3 mx-2 mt-3 border border-rose-400 bg-rose-200 text-center text-sm text-rose-600 rounded-md'>
          {error}
        </div>
      )}
    </div>
  );
}
 
export default WorkoutForm;