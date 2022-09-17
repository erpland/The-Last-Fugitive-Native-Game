import React, { useLayoutEffect, useState } from "react";
import { EnimiesType, PlayerType } from "../../../Types/levelTypes";
import Enemy from "./Enemy";
import Player from "./Player";
import { enemyMaps, enemySpriteSheets } from "../Assets/Assets";

type Props = {
  map: number[][];
  player: PlayerType;
  enemies: EnimiesType[];
  endPoint: number[];
};

const GamePlay: React.FC<Props> = ({ map, player, enemies, endPoint }) => {
  const [frame, setFrame] = useState(0);
  // const enemiesKeys = {
  //   ...enemies.map((e) => {
  //     return [];
  //   }),
  // };
  // const enemiesPositionsMap = enemies.map((enemy) => enemy.start_position);
  // const [gameKey, setgameKey] = useState(0);
  // const [isPlayerMove, setIsPlayerMove] = useState(true);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isWon, setIsWon] = useState<boolean>();
  // const [playerPosition, setPlayerPosition] = useState(player.start_position);
  // const [enemyPosition, setEnemyPosition] = useState(enemiesPositionsMap);
  // const [nextEnemiesPositions, setNextEnemiesPositions] =
  //   useState<NextEnemiesPositionsType>(enemiesKeys);
  // const { playerData, setPlayerData } = usePlayerDataContext();
  // const { currentUser, setCurrentUser, isGuest,remainingGames,setRemainingGames } = useUserContext();
  // const { setCurrentLevel, allLevels } = useLevelContext();
  // const [isPlayerKilled, setIsPlayerKilled] = useState(false);

  //game loop
  useLayoutEffect(() => {
    let timerId: number;
    const animate = () => {
      setFrame((c) => c + 1);
      timerId = requestAnimationFrame(animate);
    };
    timerId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(timerId);
  }, []);


  // const calcStars = () => {
  //   if (playerData.steps <= steps[0].step) {
  //     return 3;
  //   } else if (playerData.steps <= steps[1].step) return 2;
  //   else {
  //     return 1;
  //   }
  // };

  // useEffect(() => {
  //   const updatePlayerData = async () => {
  //     let level = {
  //       level_code: levelCode,
  //       rank: calcStars(),
  //       popularity: 0,
  //     };

  //     if (currentUser.current_level === levelCode) {
  //       let nextLevel = levelCode + 1;
  //       await addLevelRank(currentUser._id, currentUser.token, level, isGuest);
  //       await updateUserCurrentLevel(
  //         currentUser._id,
  //         currentUser.token,
  //         nextLevel,
  //         isGuest
  //       );
  //       const ranks = currentUser.level_rank;
  //       ranks.push(level);
  //       setCurrentUser({
  //         ...currentUser,
  //         level_rank: ranks,
  //         current_level: nextLevel,
  //       });
  //       setCurrentLevel(nextLevel);
  //     } else {
  //       await updateLevelRank(
  //         currentUser._id,
  //         currentUser.token,
  //         level,
  //         isGuest
  //       );
  //       currentUser.level_rank[levelCode - 1].rank = calcStars();
  //     }
  //   };
  //   if (isWon) {
  //     updatePlayerData();
  //   }
  // }, [isWon]);


  return (
    <div>
      <Player map={map} gameFrame={frame} />
      {enemies.map((enemy, index) => {
        return (
          <Enemy
            key={index}
            map={map}
            enemy={enemy}
            gameFrame={frame}
            enemySheetMap={enemyMaps[index].enemy}
            enemySpriteSheet={enemySpriteSheets[index]}
          />
        );
      })}
    </div>
  );
};

export default GamePlay;
