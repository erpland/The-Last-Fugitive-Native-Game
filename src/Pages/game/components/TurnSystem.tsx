import React, { useEffect, useState } from "react";
import { usePlayerDataContext } from "../../context/PlayerDataContext";
import Enemy from "./Enemy";
import Player from "./Player";

type Props = {
  player: {
    start_position: number[];
    startDirection: string;
  };
  enemies: { code: number; start_position: number[]; startDirection: string }[];
  map: number[][];
};
type NextEnemiesPositionsType = {
  [key: number]: number[];
};

const TurnSystem: React.FC<Props> = ({ player, enemies, map }) => {
  const enemiesKeys = {
    ...enemies.map((e) => {
      return [];
    }),
  };

  const enemiesPositionsMap = enemies.map((enemy) => enemy.start_position);
  const [isPlayerMove, setIsPlayerMove] = useState(true);
  const [playerPosition, setPlayerPosition] = useState(player.start_position);
  const [enemyPosition, setEnemyPosition] = useState(enemiesPositionsMap);
  const [nextEnemiesPositions, setNextEnemiesPositions] =
    useState<NextEnemiesPositionsType>(enemiesKeys);
  const { playerData, setPlayerData } = usePlayerDataContext();

  useEffect(() => {
    let steps = playerData.steps;
    if (!isPlayerMove) {
      steps++;
    }
    setPlayerData({ steps, isPlayerTurn: isPlayerMove });
  }, [isPlayerMove]);

  const changeEnemyPositions = (pos: number[], index: number) => {
    const positions = enemyPosition;
    positions[index] = pos;
    setEnemyPosition([...positions]);
  };
  const enemiesMap = enemies.map((enemy, index) => {
    return (
      <Enemy
        key={index}
        enemyCode={enemy.code}
        position={enemy.start_position}
        direction={enemy.startDirection}
        playerPosition={playerPosition}
        setIsPlayerMove={setIsPlayerMove}
        isPlayerMove={isPlayerMove}
        setCurrentTile={(pos) => changeEnemyPositions(pos, index)}
        nextEnemiesPositions={nextEnemiesPositions}
        setNextEnemiesPositions={(pos) => setNextEnemiesPositions(pos)}
        MAP={map}
      />
    );
  });

  return (
    <>
      <Player
        position={player.start_position}
        direction={player.startDirection}
        setCurrentTile={(pos) => setPlayerPosition(pos)}
        setIsPlayerMove={(val) => setIsPlayerMove(val)}
        isPlayerMove={isPlayerMove}
      />
      {enemiesMap}
    </>
  );
};

export default TurnSystem;
