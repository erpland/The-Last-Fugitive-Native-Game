import React, { useState } from "react";
import { LevelType } from "../../../Types/levelTypes";
import GamePlayContextProvider from "../../context/GamePlayContext";
import FinishModal from "./FinishModal";
import GamePlay from "./GamePlay";

type Props = {
  currentLevel: LevelType;
};

const GameSettings: React.FC<Props> = ({ currentLevel }) => {
  const [gameKey, setgameKey] = useState(0);
  const { map, player, enemies, end_point, step_cap, code } = currentLevel!;
  const resetLevel = () => {
    setgameKey(gameKey + 1);
  };
  console.count();
  return (
    <GamePlayContextProvider player={player} enemies={enemies} endPoint={end_point}>
      <FinishModal stepCap={step_cap} levelCode={code} resetLevel={resetLevel} />
      <GamePlay map={map} player={player} enemies={enemies} endPoint={end_point} />
    </GamePlayContextProvider>
  );
};

export default GameSettings;
