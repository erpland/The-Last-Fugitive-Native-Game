import React, { createContext, useState } from "react";
import { UserType, UserContextType } from "../../Types/userTypes";

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider: React.FC<React.ReactNode> = ({ children }) => {
const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

