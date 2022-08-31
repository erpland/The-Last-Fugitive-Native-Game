import { Preferences } from "@capacitor/preferences";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UserType, UserContextType, AvatarsType } from "../../Types/userTypes";
import { REMAINING_GAMES_TIMER } from "../../utils/constants";

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
  const [remainingGames, setRemainingGames] = useState(5);
  const interval = useRef(setInterval(() => {}, REMAINING_GAMES_TIMER));

  useEffect(() => {
    clearInterval(interval.current);
    if (remainingGames < 5) {
      console.log("added remaing games interval");
      interval.current = setInterval(() => {
        console.log("added 1 life")
        updateRemainingGames();
      }, REMAINING_GAMES_TIMER);
    }
    return () => {
      clearInterval(interval.current);
    };
  }, [remainingGames]);
  const updateRemainingGames = async () => {
    setRemainingGames(remainingGames + 1);
    await Preferences.set({ key: "games", value: String(remainingGames + 1) });
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
export const useUserContext = () => useContext(UserContext) as UserContextType;
