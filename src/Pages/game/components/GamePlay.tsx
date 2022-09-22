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
