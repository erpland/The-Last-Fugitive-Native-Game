import React from "react";
import { LevelType } from "../../../Types/levelTypes";
import GamePlayContextProvider from "../../context/GamePlayContext";
import FinishModal from "./FinishModal";
import GamePlay from "./GamePlay";

type Props = {
  currentLevel: LevelType;
  resetLevel:()=>void
};

const GameSettings: React.FC<Props> = ({ currentLevel,resetLevel }) => {

  const { map, player, enemies, end_point, step_cap, code } = currentLevel!;

  return (
    <GamePlayContextProvider
      player={player}
      enemies={enemies}
      endPoint={end_point}
      stepCap={step_cap}
      levelCode={code}
    >
      <FinishModal stepCap={step_cap} levelCode={code} resetLevel={resetLevel} />
      <GamePlay map={map} player={player} enemies={enemies} endPoint={end_point} />
    </GamePlayContextProvider>
  );
};

export default GameSettings;
