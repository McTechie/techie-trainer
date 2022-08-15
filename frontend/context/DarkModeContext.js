import { createContext, useReducer } from 'react';

export const DarkModeContext = createContext();

export const darkModeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DARK_MODE':
      return {
        darkMode: !state.darkMode
      };
    default:
      return state;
  }
}

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(darkModeReducer, { darkMode: false });
  
  return (
    <DarkModeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  )
}