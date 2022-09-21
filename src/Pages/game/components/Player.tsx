import React, { createRef, useEffect, useReducer, useRef } from "react";
import { PlayerActionType, PlayerStateType, SpriteFrameType } from "../../../Types/GameTypes";
import { DIR_CSS, GAME_SPEED } from "../../../utils/constants";
import { useGamePlayContext } from "../../context/GamePlayContext";
import { useGameSettingsContext } from "../../context/GameSettingsContext";
import { useMusicContext } from "../../context/MusicContext";
import spriteSheetMap from "../Assets/Player/playerFull.json";
import spriteSheetImg from "../Assets/Player/playerFull.png";
import "../styles/player.scss";

const reducer = (state: PlayerStateType, action: PlayerActionType): PlayerStateType => {
  const { type, payload } = action;
  switch (type) {
    case "NEXT_FRAME":
      return {
        ...state,
        currentFrame: (state.currentFrame + 1) % spriteSheetMap.player.idle.length,
      };
    case "CHANGE_PLAYER_STATE":
      return { ...state, playerState: payload };
  }
};

type Props = {
  map: number[][];
  gameFrame: number;
};
const Player: React.FC<Props> = ({ map, gameFrame }) => {
  const { gamePlayState, gamePlayDispatch, checkForLost, checkForWin } = useGamePlayContext();
  const {playWrongTile} = useMusicContext()
  const {
    mapRef,
    SCREEN_WIDTH,
    boxesRef,
    playerGraph,
    enemyGraph,
    settingsState,
    settingsDispatch,
  } = useGameSettingsContext();
  const { isPlayerTurn } = settingsState;
  const TILE_SIZE = SCREEN_WIDTH / map[0].length;
  const canvasRef = createRef<HTMLCanvasElement>();
  const playerDivRef = createRef<HTMLDivElement>();
  const playerSprite = useRef<HTMLImageElement | null>(null);
  const [state, dispatch] = useReducer(reducer, {
    playerState: "idle",
    currentFrame: 0,
  });

  const playerFrame = useRef<SpriteFrameType>(spriteSheetMap.player.idle[state.currentFrame]);
  useEffect(() => {
    playerSprite.current = new Image();
    playerSprite.current.src = spriteSheetImg;
  }, []);
  useEffect(() => {
    if (gameFrame % GAME_SPEED === 0) {
      drawPlayer();
    }
  }, [gameFrame]);

  useEffect(() => {
    playerGraph.current!.setStart(
      `${gamePlayState.playerPosition[0]}_${gamePlayState.playerPosition[1]}`
    );
    enemyGraph.current!.setEnd(
      `${gamePlayState.playerPosition[0]}_${gamePlayState.playerPosition[1]}`
    );
    if (canvasRef.current) {
      if (gameFrame !== 0) {
        movePlayer();
        settingsDispatch({ type: "CLEAR_HINT" });
      }
    }
  }, [gamePlayState.playerPosition]);
  useEffect(() => {
    if (isPlayerTurn) {
      mapRef.current!.onclick = (e: any) => {
        const y = e.target!.dataset.y
          ? parseInt(e.target!.dataset.y)
          : parseInt(e.target.parentNode.parentNode.dataset.y);
        const x = e.target!.dataset.x
          ? parseInt(e.target!.dataset.x)
          : parseInt(e.target.parentNode.parentNode.dataset.x);
        let isColider = e.target.dataset.colider || e.target.parentNode.parentNode.dataset.colider;
        if (validateMove(isColider, y, x)) {
          gamePlayDispatch({ type: "CHANGE_PLAYER_POSITION", payload: { y, x } });
        } else {
          playWrongTile()
          handleInvalidPosition();
        }
      };
    } else {
      mapRef.current!.onclick = () => {
        playWrongTile()
      };
    }
  }, [isPlayerTurn]);

  const handleInvalidPosition = () => {
    const keys = [
      `${gamePlayState.playerPosition[0] + 1}_${gamePlayState.playerPosition[1]}`,
      `${gamePlayState.playerPosition[0] - 1}_${gamePlayState.playerPosition[1]}`,
      `${gamePlayState.playerPosition[0]}_${gamePlayState.playerPosition[1] + 1}`,
      `${gamePlayState.playerPosition[0]}_${gamePlayState.playerPosition[1] - 1}`,
    ];
    keys.forEach((k) => {
      if (boxesRef.current![k] && boxesRef.current![k].dataset.colider ==='false') {
        boxesRef.current![k].classList.add("box_heighlight");
        boxesRef.current![k].onanimationend = (a) => {
          boxesRef.current![k].classList.remove("box_heighlight");
        };
      }
    });
  };
  const drawPlayer = () => {
    if (canvasRef && canvasRef.current) {
      const ctx = canvasRef.current?.getContext("2d")!;
      const draw = () => {
        ctx.clearRect(0, 0, TILE_SIZE + 10, TILE_SIZE + 10);
        playerFrame.current = spriteSheetMap.player[state.playerState][state.currentFrame];
        dispatch({ type: "NEXT_FRAME" });
        ctx.drawImage(
          playerSprite.current!,
          playerFrame.current.frame.x,
          playerFrame.current.frame.y,
          playerFrame.current.frame.w,
          playerFrame.current.frame.h,
          -10,
          -10,
          TILE_SIZE + 5,
          TILE_SIZE + 5
        );
      };
      draw();
    }
  };
  const movePlayer = () => {
    mapRef.current!.onclick = () => {};
    playerDivRef.current!.style.transform = DIR_CSS[gamePlayState.playerDirection];
    playerDivRef.current!.style.top = `${gamePlayState.playerPosition[0] * TILE_SIZE}px`;
    playerDivRef.current!.style.left = `${gamePlayState.playerPosition[1] * TILE_SIZE}px`;
    dispatch({ type: "CHANGE_PLAYER_STATE", payload: "move" });
    playerDivRef.current!.ontransitionend = (t) => {
      if (t.propertyName === "left" || t.propertyName === "top") {
        dispatch({ type: "CHANGE_PLAYER_STATE", payload: "idle" });
        settingsDispatch({ type: "STEPS_INCRESMENT" });
        checkForLost();
        checkForWin();
        settingsDispatch({ type: "CHANGE_TURN", payload: false });
      }
    };
  };
  const validateMove = (isColider: string, y: number, x: number) => {
    if (
      isColider === "true" ||
      !(
        (y === gamePlayState.playerPosition[0] + 1 && x === gamePlayState.playerPosition[1]) ||
        (y === gamePlayState.playerPosition[0] - 1 && x === gamePlayState.playerPosition[1]) ||
        (y === gamePlayState.playerPosition[0] && x === gamePlayState.playerPosition[1] + 1) ||
        (y === gamePlayState.playerPosition[0] && x === gamePlayState.playerPosition[1] - 1)
      )
    ) {
      return false;
    }
    return true;
  };

  return (
    <div
      ref={playerDivRef}
      data-colider={true}
      data-type={"player"}
      className="player"
      style={
        (DIR_CSS[gamePlayState.playerDirection],
        {
          width: TILE_SIZE,
          height: TILE_SIZE,
          top: `${gamePlayState.playerPosition[0] * TILE_SIZE}px`,
          left: `${gamePlayState.playerPosition[1] * TILE_SIZE}px`,
        })
      }
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
