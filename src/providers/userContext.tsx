import React, { createContext, useState, ReactNode, useContext } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (updatedUser: Partial<User>) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (updatedUser: Partial<User>) => {
    setUser(prevUser => prevUser ? { ...prevUser, ...updatedUser } : null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
