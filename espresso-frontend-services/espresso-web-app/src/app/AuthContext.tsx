import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ENDPOINT } from '../types/Env';

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  setIsLoggedIn: () => {}, // Provide a default empty function
});

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userToken = localStorage.getItem('userToken'); // Get the userToken from localStorage
        if (!userToken) {
          setIsLoggedIn(false);
          return;
        }
        const response = await fetch(`${ENDPOINT}/api/auth/me`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`, // Add the Authorization header here
          },
        });

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
export {};
