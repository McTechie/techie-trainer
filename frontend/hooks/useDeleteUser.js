import { useAuth } from './useAuth';

export const useDeleteUser = () => {
  const { dispatch } = useAuth();
  
  const deleteUser = async (user) => {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/delete/' + user.username, {
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