import { useState } from 'react';
import { useAuth } from './useAuth';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuth();
  
  const signup = async (username, password) => {
    setLoading(true);
    setError(null);
    
    const res = await fetch('http://localhost:4000/api/user/signup', {
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

  return { signup, loading, setLoading, error, setError };
}
