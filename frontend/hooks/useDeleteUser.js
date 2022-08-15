import { useAuth } from './useAuth';

export const useDeleteUser = () => {
  const { dispatch } = useAuth();
  
  const deleteUser = async (user) => {
    const res = await fetch('http://localhost:4000/api/user/delete/' + user.username, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    if (res.ok) {
      localStorage.removeItem('user');
      dispatch({ type: 'DELETE' });
    }
  }

  return { deleteUser };
}