import React, { createContext, useContext, useState } from "react";
import { UserType, UserContextType } from "../../Types/userTypes";

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider: React.FC<React.ReactNode> = ({ children }) => {
const [currentUser, setCurrentUser] = useState<UserType | {}>({});

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext) as UserContextType

