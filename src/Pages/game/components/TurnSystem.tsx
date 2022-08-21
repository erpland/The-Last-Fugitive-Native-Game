import React, { useState } from "react";
import Enemy from "./Enemy";
import Player from "./Player";

type Props = {
  player: {
    start_position: number[];
    startDirection: string;
  };
  enemies: { code: number; start_position: number[]; startDirection: string }[];
};

const TurnSystem: React.FC<Props> = ({ player, enemies }) => {
  const [isPlayerMove, setIsPlayerMove] = useState(true);
  const [playerPosition, setPlayerPosition] = useState(player.start_position);
  const [enemyPosition, setEnemyPosition] = useState(enemies[0].start_position);




  
  return (
    <>
      <Player
        position={player.start_position}
        direction={player.startDirection}
        setCurrentTile={(pos) => setPlayerPosition(pos)}
        setIsPlayerMove={(val)=>setIsPlayerMove(val)}
        isPlayerMove={isPlayerMove}
      />
      <Enemy />
    </>
  );
};

export default TurnSystem;
