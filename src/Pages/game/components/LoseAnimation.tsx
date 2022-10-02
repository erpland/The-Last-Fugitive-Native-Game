import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { SpriteFrameType } from "../../../Types/GameTypes";
import spriteSheetMap from "../Assets/Player/playerFull.json";
import spriteSheetImg from "../Assets/Player/playerFull.png";
import { enemyMaps, enemySpriteSheets } from "../Assets/Assets";
import { useGamePlayContext } from "../../context/GamePlayContext";
type Props = {};

const LoseAnimation = (props: Props) => {
  const {gamePlayState} = useGamePlayContext()
  const enemyIdx = gamePlayState.gameOver.killedByIdx
  const playerSprite = useRef<HTMLImageElement | null>(null);
  const playerCanvasRef = useRef<HTMLCanvasElement>(null);
  const playerFrame = useRef<SpriteFrameType>(spriteSheetMap.player.die[0]);
  const enemySprite = useRef<HTMLImageElement | null>(null);
  const enemyCanvasRef = useRef<HTMLCanvasElement>(null);
  const enemyFrame = useRef<SpriteFrameType>(enemyMaps[enemyIdx].enemy.attack[0]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [frame, setFrame] = useState(0);
  const timerId = useRef(0);

  const animate = () => {
    setFrame((c) => c + 1);
    timerId.current = requestAnimationFrame(animate);
  };

  useLayoutEffect(() => {
    timerId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(timerId.current);
  }, []);

  useEffect(() => {
    playerSprite.current = new Image();
    playerSprite.current.src = spriteSheetImg;
    enemySprite.current = new Image();
    enemySprite.current.src = enemySpriteSheets[enemyIdx];
  }, []);

  useEffect(() => {
    if (frame % 10 === 0) {
      drawPlayer();
      drawEnemy();
    }
    if (currentFrame >= spriteSheetMap.player.die.length) {
      cancelAnimationFrame(timerId.current);
      setCurrentFrame(19);
    }
  }, [frame]);

  const drawPlayer = () => {
    if (playerCanvasRef && playerCanvasRef.current) {
      const ctx = playerCanvasRef.current?.getContext("2d")!;
      const draw = () => {
        ctx.clearRect(0, 0, 100, 100);
        playerFrame.current = spriteSheetMap.player.die[currentFrame];
        setCurrentFrame((prev) => ((prev + 1) % spriteSheetMap.player.die.length) + 1);
        ctx.drawImage(
          playerSprite.current!,
          playerFrame.current.frame.x,
          playerFrame.current.frame.y,
          playerFrame.current.frame.w,
          playerFrame.current.frame.h,
          0,
          0,
          100,
          100
        );
      };
      draw();
    }
  };
  const drawEnemy = () => {
    if (enemyCanvasRef && enemyCanvasRef.current) {
      const ctx = enemyCanvasRef.current?.getContext("2d")!;
      const draw = () => {
        ctx.clearRect(0, 0, 100, 100);
        enemyFrame.current = enemyMaps[enemyIdx].enemy.attack[currentFrame];

        ctx.drawImage(
          enemySprite.current!,
          enemyFrame.current.frame.x,
          enemyFrame.current.frame.y,
          enemyFrame.current.frame.w,
          enemyFrame.current.frame.h,
          0,
          0,
          100,
          100
        );
      };
      draw();
    }
  };
  return (
    <div
      style={{
        position: "relative",
        top: 0,
        left: 0,
        width: "150px",
        height: "150px",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100px",
        }}
      >
        <div
          ref={playerSprite}
          style={{
            position: "absolute",
            top: "0",
            left: "0%",
            // transform: "translate(-50px, 0)",
          }}
        >
          <canvas
            style={{
              pointerEvents: "none",
              zIndex: 100,
            }}
            ref={playerCanvasRef}
            width={100}
            height={100}
          />
        </div>
        <div
          ref={enemySprite}
          style={{
            position: "absolute",
            top: "0",
            right: "0%",
            transform: "scaleX(-1)",
          }}
        >
          <canvas
            style={{ pointerEvents: "none", zIndex: 100 }}
            ref={enemyCanvasRef}
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default LoseAnimation;
