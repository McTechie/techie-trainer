import { TrashIcon } from '@heroicons/react/solid';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const WorkoutCard = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
      method: 'DELETE'
    });

    const json = await res.json();

    if (!res.ok) {
      alert(json.error);
    }

    if (res.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
      alert('Workout deleted!');
    }
  }

  return (
    <div className='bg-white p-5 rounded-lg shadow-md border-gray-50 text-neutral-600'>
      <h4 className='font-bold text-primary mr-2 mb-3 text-lg flex justify-between'>
        {workout.title}
        <TrashIcon
          onClick={handleDelete}
          className='h-8 border-2 border-primary p-1 rounded-full cursor-pointer active:ease-in-out active:duration-100 active:border-4 active:scale-95'
        />
      </h4>
      <p className='text-sm'><strong>Load &#40;kg&#41;: </strong>{workout.load}</p>
      <p className='text-sm my-1'><strong>Sets: </strong>{workout.sets}</p>
      <p className='text-sm my-1'><strong>Reps: </strong>{workout.reps}</p>
      <p className='text-sm text-neutral-400'>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
    </div>
  );
}
 
export default WorkoutCard;