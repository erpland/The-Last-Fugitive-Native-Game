import React, { createContext, useContext, useEffect, useState } from "react";
import { UserType, UserContextType, AvatarsType } from "../../Types/userTypes";

export const UserContext = createContext<UserContextType | null>(null);

const UserContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserType>({
    _id: "",
    nickname: "guest7529859852",
    email: "guest",
    password: "guest",
    current_level: 1,
    level_rank: [
      {
        level_code: 0,
        rank: 0,
        popularity: 0,
      },
    ],
    avatarCode: 0,
    avatarUrl: "",
    gender: 1,
    is_notification: true,
    time_of_register: new Date(),
    play_dates: [],
    token: "",
  });
  const [avatars, setAvatars] = useState<AvatarsType[]>([
    {
      _id: "",
      gender: "",
      options: [
        {
          code: 0,
          url: "",
        },
      ],
    },
  ]);
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [remainingGames, setRemainingGames] = useState(3);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        avatars,
        setAvatars,
        isRegisteredUser,
        setIsRegisteredUser,
        isGuest,
        setIsGuest,
        remainingGames,
        setRemainingGames
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext) as UserContextType;
