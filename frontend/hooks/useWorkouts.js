import { useContext } from 'react';
import { WorkoutsContext } from '../context/WorkoutsContext';

export const useWorkouts = () => {
  const context = useContext(WorkoutsContext);

  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutsContextProvider');
  }

  return context;
}