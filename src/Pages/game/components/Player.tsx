import React, { createRef, useEffect, useRef, useState } from "react";
import { TILE_SIZE } from "../constants/constants";
import { directionMap } from "../constants/helpers";
import spriteSheetMap from '../Assets/Player/playerFull.json'
import spriteSheetImg from "../Assets/Player/playerFull.png";
import '../styles/player.scss'
import { changeSpriteDirection, getSpriteFrameByState, getSpriteImage, getSpriteNextDirection } from "../functions";
import { SpriteFrameType } from "../../../Types/GameTypes";

type Props = {
  position: number[];
  direction: string;
  setCurrentTile: (pos: any) => void;
  setIsPlayerMove: (val: boolean) => void;
  isPlayerMove: boolean;
  setIsFinished:React.Dispatch<React.SetStateAction<boolean>>
  counter:number
  setIsWon:React.Dispatch<React.SetStateAction<boolean|undefined>>
};

const Player: React.FC<Props> = ({
  position,
  direction,
  setCurrentTile,
  setIsPlayerMove,
  isPlayerMove,
  setIsFinished,
  counter,
  setIsWon
}) => {
  const playerSprite = useRef<HTMLImageElement | null>(null)
  const canvasRef = createRef<HTMLCanvasElement>();
  const playerDivRef = createRef<HTMLDivElement>();
  const [currentFrame, setCurrentFrame] = useState(0);
  const [playerState, setPlayerState] = useState("idle");
  const [playerCurrentPostion, setPlayerCurrentPosition] = useState(position);
  const [playerAskedPosition, setPlayerAskedPosition] = useState<number[] | null>(null);
  const [playerCurrentDirection, setCurrentPlayerDirection] = useState(directionMap[direction]);
  const playerFrame = useRef<SpriteFrameType>(spriteSheetMap.player.idle[currentFrame])

  useEffect(()=>{
    changeSpriteDirection(playerDivRef.current!,-1)
    // setCurrentPlayerDirection(askedDirection);
  },[])
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
      if (askedDirection !== playerCurrentDirection) {
        let directionAxis = getSpriteNextDirection(askedDirection)
        changeSpriteDirection(playerDivRef.current!,directionAxis);
        setCurrentPlayerDirection(askedDirection);
      }
      setPlayerState("move");
      setPlayerCurrentPosition([
        playerAskedPosition[0],
        playerAskedPosition[1],
      ]);
      setCurrentTile([playerAskedPosition[0], playerAskedPosition[1]]);
    } else {
      endTurn();
    }

    setPlayerPosition();
  }, [playerAskedPosition, playerCurrentPostion]);
  

  // יצירת שחקן וקריאה לעדכון פריים
  useEffect(() => {
    //*
    playerSprite.current = getSpriteImage(spriteSheetImg)
    playerSprite.current.onload = () => {
      drawPlayer();
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
          setIsFinished(true)
          setIsWon(true)
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

  const drawPlayer = () => {
    if (canvasRef && canvasRef.current) {
      const ctx = canvasRef.current?.getContext("2d")!;
      const draw = () => {
        ctx.clearRect(0, 0, TILE_SIZE, TILE_SIZE);
        // getPlayerState();
        playerFrame.current = getSpriteFrameByState(playerState,spriteSheetMap.player,currentFrame)
        if (currentFrame < spriteSheetMap.player.idle.length - 1) {
          setCurrentFrame((f) => f + 1);
        } else {
          setCurrentFrame(0);
        }
        ctx.drawImage(
          playerSprite.current!,
          playerFrame.current.frame.x,
          playerFrame.current.frame.y,
          playerFrame.current.frame.w,
          playerFrame.current.frame.h,
          0,
          0,
          TILE_SIZE,
          TILE_SIZE
        );
      };
      draw();
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
      return playerCurrentDirection
    else if (playerAskedPosition![1] < playerCurrentPostion[1])
      return playerCurrentDirection
  };
  const endTurn = () => {
    playerDivRef.current!.ontransitionend = (t) => {
      if (t.propertyName === "left" || t.propertyName === "top") {
        setPlayerState("idle");
        setIsPlayerMove(false);
      }
    };
  };
  return (
    <div
      ref={playerDivRef}
      data-colider={true}
      data-type={"player"}
      className="player"
      style={{width:TILE_SIZE,height:TILE_SIZE}}
    >
      <canvas
        style={{ pointerEvents: "none", zIndex: 100 }}
        ref={canvasRef}
        width={TILE_SIZE}
        height={TILE_SIZE}
      />
    </div>
  );
};

export default Player;
