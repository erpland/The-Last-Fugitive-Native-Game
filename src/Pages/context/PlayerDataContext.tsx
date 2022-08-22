import React, { createContext, useContext, useState } from "react";
import { PlayerDataContextType, } from "../../Types/PlayerDataType";

export const PlayerDataContext = createContext<PlayerDataContextType | null>(null);

const PlayerDataContextProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [playerData, setPlayerData] = useState({
    steps: 0,
    isPlayerTurn: true,
  });
  return (
    <PlayerDataContext.Provider
      value={{
        playerData, setPlayerData
        }}
    >
      {children}
    </PlayerDataContext.Provider>
  );
};

export default PlayerDataContextProvider;
export const usePlayerDataContext = () => useContext(PlayerDataContext) as PlayerDataContextType;
