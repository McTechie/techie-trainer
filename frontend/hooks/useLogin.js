import { useState } from 'react';
import { useAuth } from './useAuth';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuth();
  
  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const json = await res.json();
    
    if (!res.ok) {
      setLoading(false);
      setError(json.err);
    }
    
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(json));
      
      dispatch({
        type: 'LOGIN',
        payload: json
      });

      setLoading(false);
    }
  }

  return { login, loading, setLoading, error, setError };
}
