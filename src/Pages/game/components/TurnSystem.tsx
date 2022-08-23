import React, { useEffect, useLayoutEffect, useState } from "react";
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
  isFinished: boolean;
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setIsWon: React.Dispatch<React.SetStateAction<boolean>>;
};
type NextEnemiesPositionsType = {
  [key: number]: number[];
};

const TurnSystem: React.FC<Props> = ({
  player,
  enemies,
  map,
  isFinished,
  setIsFinished,
  setIsWon,
}) => {
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
  const [counter, setCounter] = useState(0);

  //game loop
  useLayoutEffect(() => {
    let timerId: number;
    const animate = () => {
      setCounter((c) => c + 1);
      timerId = requestAnimationFrame(animate);
    };

    timerId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(timerId);
  }, []);
  //update game data
  useEffect(() => {
    let steps = playerData.steps;
    if (!isPlayerMove) {
      steps++;
    }
    setPlayerData({ steps, isPlayerTurn: isPlayerMove });
  }, [isPlayerMove]);
  //check if player lost
  useEffect(() => {
    for (let i in nextEnemiesPositions)
      if (
        (playerPosition[0] === enemyPosition[i][0] &&
          playerPosition[1] + 1 === enemyPosition[i][1]) ||
        (playerPosition[0] === enemyPosition[i][0] &&
          playerPosition[1] - 1 === enemyPosition[i][1]) ||
        (playerPosition[0] + 1 === enemyPosition[i][0] &&
          playerPosition[1] === enemyPosition[i][1]) ||
        (playerPosition[0] - 1 === enemyPosition[i][0] &&
          playerPosition[1] === enemyPosition[i][1])
      ) {
        setTimeout(() => {
          setIsWon(false);
          setIsFinished(true);
        }, 1500);
      }
  }, [playerPosition, enemyPosition]);

  //save all enemies postisions
  const changeEnemyPositions = (pos: number[], index: number) => {
    const positions = enemyPosition;
    positions[index] = pos;
    setEnemyPosition([...positions]);
  };
  //map all enemies to render
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
        counter={counter}
        setCurrentTile={(pos) => changeEnemyPositions(pos, index)}
        nextEnemiesPositions={nextEnemiesPositions}
        setNextEnemiesPositions={(pos) => setNextEnemiesPositions(pos)}
        MAP={map}
        setIsFinished={setIsFinished}
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
        counter={counter}
        setIsFinished={setIsFinished}
      />
      {enemiesMap}
    </>
  );
};

export default TurnSystem;
