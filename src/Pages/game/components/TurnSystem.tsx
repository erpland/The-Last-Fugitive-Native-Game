import React, { useEffect, useLayoutEffect, useState } from "react";
import { addLevelRank, updateLevelRank, updateUserCurrentLevel } from "../../../Database/database";
import { StepCapType } from "../../../Types/levelTypes";
import { usePlayerDataContext } from "../../context/PlayerDataContext";
import { useUserContext } from "../../context/UserContext";
import FinishModal from "../../home/components/FinishModal";
import Enemy from "./Enemy";
import Player from "./Player";

type Props = {
  player: {
    start_position: number[];
    startDirection: string;
  };
  enemies: { code: number; start_position: number[]; startDirection: string }[];
  map: number[][];
 levelCode: number;
 steps:StepCapType[]

};
type NextEnemiesPositionsType = {
  [key: number]: number[];
};

const TurnSystem: React.FC<Props> = ({
  player,
  enemies,
  map,
  levelCode,
  steps
 

}) => {
  const enemiesKeys = {
    ...enemies.map((e) => {
      return [];
    }),
  };
  const enemiesPositionsMap = enemies.map((enemy) => enemy.start_position);
  const [gameKey, setgameKey] = useState(0)
  const [isPlayerMove, setIsPlayerMove] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWon,setIsWon] = useState<boolean>()
  const [playerPosition, setPlayerPosition] = useState(player.start_position);
  const [enemyPosition, setEnemyPosition] = useState(enemiesPositionsMap);
  const [nextEnemiesPositions, setNextEnemiesPositions] =
    useState<NextEnemiesPositionsType>(enemiesKeys);
  const { playerData, setPlayerData } = usePlayerDataContext();
  const { currentUser, setCurrentUser } = useUserContext();
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
          setIsModalOpen(true);
        }, 1500);
      }
  }, [playerPosition, enemyPosition]);
  const calcStars = () => {
    if (playerData.steps <= steps[0].step) {
      return 3;
    } else if (playerData.steps <= steps[1].step) return 2;
    else {
      return 1;
    }
  };
  useEffect(() => {
    const updatePlayerData=async()=>{
      let level={
        level_code: levelCode,
        rank: calcStars(),
        popularity:0
      }
      
      if(currentUser.current_level===levelCode){
      let nextLevel=levelCode+1
      await addLevelRank(currentUser._id,currentUser.token,level)
      await updateUserCurrentLevel(currentUser._id,currentUser.token,nextLevel)
      const ranks=currentUser.level_rank
      ranks.push(level)
      setCurrentUser({...currentUser,level_rank:ranks,current_level:nextLevel})
      }
      else{
        await updateLevelRank(currentUser._id,currentUser.token,level)
        currentUser.level_rank[levelCode-1].rank=calcStars()
        
      }
    }
    if(isWon){
     updatePlayerData()
    }
   

  }, [isWon])
  

  //save all enemies postisions
  const changeEnemyPositions = (pos: number[], index: number) => {
    const positions = enemyPosition;
    positions[index] = pos;
    setEnemyPosition([...positions]);
  };


  const reloadPage=()=>{
    setgameKey(gameKey+1)
    setIsModalOpen(false)

  }
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
        setIsFinished={setIsModalOpen}
      />
    );
  });
  
  return (
    <div key={gameKey}>
     <FinishModal reloadPage={()=>reloadPage()} isModalOpen={isModalOpen} isWon={isWon!} stepCap={steps} levelCode={levelCode}/> 
      <Player
        position={player.start_position}
        direction={player.startDirection}
        setCurrentTile={(pos) => setPlayerPosition(pos)}
        setIsPlayerMove={(val) => setIsPlayerMove(val)}
        isPlayerMove={isPlayerMove}
        counter={counter}
        setIsFinished={setIsModalOpen}
        setIsWon={(val)=>setIsWon(val)}
        
      />
      {enemiesMap}
    </div>
  );
};

export default TurnSystem;
