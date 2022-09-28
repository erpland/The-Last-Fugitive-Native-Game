import React, { createRef, useEffect, useReducer, useRef } from "react";
import { SpriteFrameType, SpriteSheetType } from "../../../Types/GameTypes";
import { EnimiesType } from "../../../Types/levelTypes";
import { DIR_CSS, GAME_SPEED } from "../../../utils/Constants";
import { directionMap } from "../../../utils/helpers";
import { useGamePlayContext } from "../../context/GamePlayContext";
import { useGameSettingsContext } from "../../context/GameSettingsContext";

interface StateType {
  enemyState: string;
  currentFrame: number;
  currentPosition: number[];
  currentDirection: string;
}
interface ActionType {
  type: "NEXT_FRAME" | "CHANGE_ENEMY_STATE" | "CHANGE_POSITION";
  payload?: any;
}
const reducer = (state: StateType, action: ActionType) => {
  const { type, payload } = action;
  switch (type) {
    case "NEXT_FRAME":
      return {
        ...state,
        currentFrame: (state.currentFrame + 1) % payload,
      };
    case "CHANGE_ENEMY_STATE":
      return { ...state, enemyState: payload };
    case "CHANGE_POSITION":
      let enemyDir = state.currentDirection;
      if (payload.nextPosition[1] > state.currentPosition[1]) {
        enemyDir = "RIGHT";
      } else if (payload.nextPosition[1] < state.currentPosition[1]) {
        enemyDir = "LEFT";
      }
      return { ...state, currentPosition: payload.nextPosition, currentDirection: enemyDir };
  }
};

type Props = {
  map: number[][];
  enemy: EnimiesType;
  gameFrame: number;
  enemySheetMap: SpriteSheetType;
  enemySpriteSheet: any;
};

const Enemy: React.FC<Props> = ({ map, enemy, gameFrame, enemySheetMap, enemySpriteSheet }) => {
  const { gamePlayState, gamePlayDispatch, checkForLost } = useGamePlayContext();
  const { SCREEN_WIDTH, PROBABILITY, enemyGraph, playerGraph, settingsDispatch, settingsState } =
    useGameSettingsContext();
  const { isPlayerTurn } = settingsState;
  const canvasRef = createRef<HTMLCanvasElement>();
  const enemyDivRef = useRef<HTMLDivElement>(null);
  const enemySprite = useRef<HTMLImageElement | null>(null);
  const TILE_SIZE = SCREEN_WIDTH / map[0].length;
  const [state, dispatch] = useReducer(reducer, {
    enemyState: "idle",
    currentFrame: 0,
    currentPosition: enemy.start_position,
    currentDirection: enemy.startDirection,
  });
  const enemyFrame = useRef<SpriteFrameType>(enemySheetMap.idle[state.currentFrame]);

  useEffect(() => {
    enemySprite.current = new Image();
    enemySprite.current.src = enemySpriteSheet;
  }, []);

  useEffect(() => {
    if (gameFrame % GAME_SPEED === 0) {
      drawEnemy();
    }
  }, [gameFrame]);

  useEffect(() => {
    if (!isPlayerTurn && !gamePlayState.gameOver.isGameOver) {
      getEnemyMove();
    }
  }, [isPlayerTurn]);

  useEffect(() => {
    playerGraph.current!.setEnemies(gamePlayState.enemiesPositions);
    if (gameFrame !== 0) {
      moveEnemey();
    }
  }, [state.currentPosition]);

  const drawEnemy = () => {
    if (canvasRef && canvasRef.current) {
      const ctx = canvasRef.current?.getContext("2d")!;
      const draw = () => {
        ctx.clearRect(0, 0, TILE_SIZE, TILE_SIZE);
        enemyFrame.current = enemySheetMap[state.enemyState]![state.currentFrame];
        dispatch({ type: "NEXT_FRAME", payload: enemySheetMap.idle.length });
        ctx.drawImage(
          enemySprite.current!,
          enemyFrame.current.frame.x,
          enemyFrame.current.frame.y,
          enemyFrame.current.frame.w,
          enemyFrame.current.frame.h,
          0,
          0,
          TILE_SIZE,
          TILE_SIZE
        );
      };
      draw();
    }
  };
  const moveEnemey = () => {
    const calcTop = state.currentPosition[0] * TILE_SIZE;
    const calcLeft = state.currentPosition[1] * TILE_SIZE;

    enemyDivRef.current!.style.transform = DIR_CSS[state.currentDirection];
    enemyDivRef.current!.style.top = `${calcTop}px`;
    enemyDivRef.current!.style.left = `${calcLeft}px`;
    dispatch({ type: "CHANGE_ENEMY_STATE", payload: "move" });
    enemyDivRef.current!.ontransitionend = (t) => {
      if (t.propertyName === "left" || t.propertyName === "top") {
        dispatch({ type: "CHANGE_ENEMY_STATE", payload: "idle" });
        settingsDispatch({ type: "CHANGE_TURN", payload: true });
        checkForLost();
      }
    };
  };
  const getEnemyMove = () => {
    // קבלת הצעד הבא של האוייב הנוכחי לפי הסתברות התלויה ברמת קושי השלב
    //א. תנועה חכמה משתמשת באלגוריתם לציאת המסלול הקצר
    // ב.תנועה רנדומלית
    let nextPosition: number[];
    let probability = Math.floor(Math.random() * 10);
    if (probability <= PROBABILITY) {
      enemyGraph.current!.setStart(`${state.currentPosition[0]}_${state.currentPosition[1]}`);
      const path = enemyGraph.current!.startAlgorithm().path;
      nextPosition = [parseInt(path[1][0]), parseInt(path[1][1])];
    } else {
      nextPosition = getEnemyRandomPosition();
    }

    dispatch({
      type: "CHANGE_POSITION",
      payload: { nextPosition },
    });
    gamePlayDispatch({
      type: "CHANGE_ENEMIES_POSITION",
      payload: { nextPosition, idx: enemy.code },
    });
  };
  
  const getEnemyRandomPosition = () => {
    const [y, x] = state.currentPosition;
    let nextPosition: number[] = [];
    while (!nextPosition.length) {
      let nextDirection = Math.floor(Math.random() * 4);
      switch (nextDirection) {
        case directionMap.UP:
          if (isValidMove(y - 1, false)) {
            nextPosition = [y - 1, x];
          }
          break;
        case directionMap.DOWN:
          if (isValidMove(y + 1, false)) {
            nextPosition = [y + 1, x];
          }
          break;
        case directionMap.LEFT:
          if (isValidMove(x - 1, true)) {
            nextPosition = [y, x - 1];
          }
          break;
        case directionMap.RIGHT:
          if (isValidMove(x + 1, true)) {
            nextPosition = [y, x + 1];
          }
          break;
        default:
          break;
      }
    }
    return nextPosition;
  };
  const isValidMove = (nextPos: number, isX: boolean) => {
    const [y, x] = state.currentPosition;
    if (nextPos < 0) {
      return false;
    } else if (isX && (nextPos >= map[0].length || map[y][nextPos] === 1)) {
      return false;
    } else if (!isX && (nextPos >= map.length || map[nextPos][x] === 1)) {
      return false;
    }
    return true;
  };

  return (
    <div
      ref={enemyDivRef}
      data-colider={true}
      data-type={"enemy"}
      className="player"
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        top: state.currentPosition[0] * TILE_SIZE,
        left: state.currentPosition[1] * TILE_SIZE,
      }}
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

export default Enemy;
