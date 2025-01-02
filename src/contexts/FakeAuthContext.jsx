import { createContext, useReducer } from 'react';

const AuthContext = createContext(null);

const initialSate = {
  user: null,
  isAuthenticated: false,
};

/**
 * Reducer for the AuthContext.
 *
 * @param {Object} state - The current state.
 * @param {Object} action - The action to be processed.
 * @returns {Object} The new state.
 */
function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error('Unknown action type');
  }
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(reducer, initialSate);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) dispatch({ type: 'LOGIN', payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: 'LOGOUT' });
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
