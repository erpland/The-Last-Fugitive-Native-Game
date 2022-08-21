import React, { createRef, useEffect, useLayoutEffect, useState } from "react";
import { TILE_SIZE } from "../constants/constants";
import { directionMap } from "../constants/helpers";
import playerFullJSON from '../Assets/Player/playerFull.json'
import playerFullImg from "../Assets/Player/playerFull.png";
import '../styles/player.scss'

type Props = {
  position: number[];
  direction: string;
  setCurrentTile: (pos: any) => void;
  setIsPlayerMove: (val: boolean) => void;
  isPlayerMove: boolean;
};

const Player: React.FC<Props> = ({
  position,
  direction,
  setCurrentTile,
  setIsPlayerMove,
  isPlayerMove,
}) => {
  let playerSprite :any;
  const canvasRef = createRef<HTMLCanvasElement>();
  const playerDivRef = createRef<HTMLDivElement>();
  const [currentFrame, setCurrentFrame] = useState(0);
  const [counter, setCounter] = useState(0);
  const [playerState, setPlayerState] = useState("idle");
  const [playerCurrentPostion, setPlayerCurrentPosition] = useState(position);
  const [playerAskedPosition, setPlayerAskedPosition] = useState<number[] | null>(null);
  const [playerCurrentDirection, setCurrentPlayerDirection] = useState(directionMap[direction]);
  let playerFrame = playerFullJSON.player.idle[currentFrame];
  let feetFrame = playerFullJSON.player.feet[0];
  useLayoutEffect(() => {
    //יצירת לולאת המשחק לעידכון
    //timer
    let timerId : number;
    const animate = () => {
      setCounter((c) => c + 1);
      timerId = requestAnimationFrame(animate);
    };
    timerId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(timerId);
  }, []);
  
  useEffect(() => {
    //תזוזת השחקן
    if (!isPlayerMove) {
      return;
    }
    if (
      playerAskedPosition !== null &&
      (playerAskedPosition[0] !== playerCurrentPostion[0] ||
        playerAskedPosition[1] !== playerCurrentPostion[1])
    ) {
      let askedDirection = getPlayerNextDirection();
      console.log(askedDirection !== playerCurrentDirection);
      if (askedDirection !== playerCurrentDirection) {
        let degress = getPlayerNextDirectionDegree(askedDirection);
        changeDirection(degress);
        setCurrentPlayerDirection(askedDirection);
      }
      setPlayerState("move");
      setPlayerCurrentPosition([
        playerAskedPosition[0],
        playerAskedPosition[1],
      ]);
      setCurrentTile([playerAskedPosition[0], playerAskedPosition[1]]);
    } else {
      // endMove();
    }

    setPlayerPosition();
  }, [playerAskedPosition, playerCurrentPostion]);
  

  useEffect(() => {
    // יצירת שחקן וקריאה לעדכון פריים
    playerSprite = new Image();
    playerSprite.src = playerFullImg;
    playerSprite.onload = () => {
      drawPlayer("draw");
    };
  }, [counter % 5 === 0]);

  useEffect(() => {
    //לחיצה על משבצת
    window.onclick = (e:any) => {
      let askedPos = {
        x: parseInt(e.target.dataset.x),
        y: parseInt(e.target.dataset.y),
      };
      let isColider = e.target.dataset.colider;
      if (isValidMove(askedPos, isColider)) {
        setPlayerAskedPosition([askedPos.x, askedPos.y]);
      }
      if (e.target.dataset.win_tile === "true") {
        setTimeout(() => {
          alert("winner");
        }, 1000);
      }
    };
    const isValidMove = (pos:any, isColider:string) => {
      if (isColider === `true`) {
        return false;
      }
      if (
        (pos.x === playerCurrentPostion[0] + 1 &&
          pos.y === playerCurrentPostion[1]) ||
        (pos.x === playerCurrentPostion[0] - 1 &&
          pos.y === playerCurrentPostion[1])
      ) {
        return true;
      }
      if (
        (pos.x === playerCurrentPostion[0] &&
          pos.y === playerCurrentPostion[1] + 1) ||
        (pos.x === playerCurrentPostion[0] &&
          pos.y === playerCurrentPostion[1] - 1)
      )
        return true;
      return false;
    };
  }, [playerCurrentPostion]);

  const drawPlayer = (action:any, dir = 0) => {
    if (canvasRef && canvasRef.current) {
      const ctx = canvasRef.current?.getContext("2d")!;
      const draw = () => {
        ctx.clearRect(0, 0, TILE_SIZE, TILE_SIZE);
        // (image, sx, sy, sw, sh, dx, dy, dw, dh)
        getPlayerState();

        ctx.drawImage(
          playerSprite,
          feetFrame.frame.x,
          feetFrame.frame.y,
          feetFrame.frame.w,
          feetFrame.frame.h,
          15,
          20,
          TILE_SIZE / 2,
          TILE_SIZE / 2
        );
        if (currentFrame < playerFullJSON.player.idle.length - 1) {
          setCurrentFrame((f) => f + 1);
        } else {
          setCurrentFrame(0);
        }
        ctx.drawImage(
          playerSprite,
          playerFrame.frame.x,
          playerFrame.frame.y,
          playerFrame.frame.w,
          playerFrame.frame.h,
          0,
          0,
          TILE_SIZE,
          TILE_SIZE
        );
      };
      draw();
    }
  };
  const getPlayerState = () => {
    switch (playerState) {
      case "idle":
        playerFrame = playerFullJSON.player.idle[currentFrame];
        feetFrame = playerFullJSON.player.feet[0];
        break;
      case "move":
        playerFrame = playerFullJSON.player.move[currentFrame];
        feetFrame = playerFullJSON.player.feet[currentFrame];
        break;
      default:
        break;
    }
  };
  const setPlayerPosition = () => {
    playerDivRef.current!.style.left =
    `${playerCurrentPostion[0] * TILE_SIZE}px`;
    playerDivRef.current!.style.top =
    `${playerCurrentPostion[1] * TILE_SIZE}px`;
  };
  const getPlayerNextDirection = () => {
    if (playerAskedPosition![0] > playerCurrentPostion[0])
      return directionMap.RIGHT;
    else if (playerAskedPosition![0] < playerCurrentPostion[0])
      return directionMap.LEFT;
    else if (playerAskedPosition![1] > playerCurrentPostion[1])
      return directionMap.DOWN;
    else if (playerAskedPosition![1] < playerCurrentPostion[1])
      return directionMap.UP;
  };
  const getPlayerNextDirectionDegree = (askedDirection:any) => {
    switch (askedDirection) {
      case directionMap.UP:
        return 270 % 360;
        // prev === directionMap.RIGHT ? "rotate(-90deg)" : "rotate(270deg)";
        break;
      case directionMap.DOWN:
        return 90 % 360;
        // prev === directionMap.LEFT ? "rotate(90deg)" : "rotate(90deg)";
        break;
      case directionMap.LEFT:
        return 180 % 360;
        // prev === directionMap.UP ? "rotate(-180deg)" : "rotate(180deg)";
        break;
      case directionMap.RIGHT:
        return 0 % 360;
        // prev === directionMap.DOWN ? "rotate(-0deg)" : "rotate(0deg)";
        break;
      default:
        break;
    }
  };
  const changeDirection = (degress:any) => {
    playerDivRef.current!.style.transform = "rotate(0)";
    playerDivRef.current!.style.transform =
      degress >= 180 ? `rotate(${degress - 360}deg)` : `rotate(${degress}deg)`;
  };


  return (
    <div
      ref={playerDivRef}
      data-colider={true}
      data-type={"player"}
      className="player"
      style={{width:TILE_SIZE,height:TILE_SIZE}}
      // style={{ transform: "rotate(0deg)" }}
    >
      <canvas
        style={{ pointerEvents: "none", zIndex: 100 }}
        ref={canvasRef}
        width={TILE_SIZE}
        height={TILE_SIZE}
      />
      <h1 style={{
          border: "1px solid red",
          transform: "rotate(0deg)",
          transition: "3s",
        }}> {"=>"}</h1>
    </div>
  );
};

export default Player;