//קונטקסט למשתמש-מכיל את כל הסטייטים שאנו מעוניינים להוריד לכלל הקומפוננטות אשר משפיעות על משתמש
import { Preferences } from "@capacitor/preferences";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  UserType,
  AvatarsType,
  RemainingGamesType,
  LifesObjectType,
  UserContextType,
} from "../../Types/userTypes";
import { REMAINING_GAMES_TIMER } from "../../utils/Constants";

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
    isActive:true
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
  const [lifesObject, setLifesObject] = useState<LifesObjectType>({ user: 5, guest: 3 });
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [remainingGames, setRemainingGames] = useState<RemainingGamesType>();
  //שולט בהוספת חיים כל זמן קצוב
  const interval = useRef(setInterval(() => {}, REMAINING_GAMES_TIMER));
//בכל פעם שהיה שינוי בסטייט כמות המשחקים-נאפס את האינטרוול ונתחיל מהתחלה
  useEffect(() => {
    clearInterval(interval.current);
    if (remainingGames && remainingGames.current < remainingGames.max) {
      console.log("added remaing games interval");
      interval.current = setInterval(() => {
        console.log("added 1 life");
        updateRemainingGames();
      }, REMAINING_GAMES_TIMER);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [remainingGames]);
  const updateRemainingGames = async () => {
    setRemainingGames({ ...remainingGames!, current: remainingGames!.current + 1 });
    await Preferences.set({ key: "games", value: String(remainingGames!.current + 1) });
  };
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
        setRemainingGames,
        lifesObject,
        setLifesObject,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext) as UserContextType;
