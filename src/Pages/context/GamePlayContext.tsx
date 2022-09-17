import React, { createContext, useContext, useReducer } from "react";
import {
  GamePlayContextActionType,
  GamePlayContextStateType,
  GamePlayContextType,
} from "../../Types/GameTypes";
import { EnimiesType, PlayerType } from "../../Types/levelTypes";

export const GamePlayContext = createContext<GamePlayContextType | null>(null);
const init = (initialState: any) => {
  return initialState;
};

const reducer = (state: GamePlayContextStateType, action: GamePlayContextActionType) => {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE_PLAYER_POSITION":
      let playerDir = state.playerDirection;
      if (payload.x > state.playerPosition[1]) {
        playerDir = "RIGHT";
      } else if (payload.x < state.playerPosition[1]) {
        playerDir = "LEFT";
      }
      return { ...state, playerPosition: [payload.y, payload.x], playerDirection: playerDir };

    case "CHANGE_ENEMIES_POSITION":
      const enemiesPos = [...state.enemiesPositions];
      const enemiesDir = [...state.enemiesDirection];

      let enemyDir = enemiesDir[payload.idx];
      if (payload.nextPosition[1] > state.enemiesPositions[payload.idx][1]) {
        enemyDir = "RIGHT";
      } else if (payload.nextPosition[1] < state.enemiesPositions[payload.idx][1]) {
        enemyDir = "LEFT";
      }
      enemiesPos[payload.idx] = payload.nextPosition;
      enemiesDir[payload.idx] = enemyDir;
      return { ...state, enemiesPositions: [...enemiesPos], enemiesDirection: [...enemiesDir] };

    case "WIN":
      return { ...state, gameOver: { ...state.gameOver, isGameOver: true, isWon: true } };

    case "LOST":
      return {
        ...state,
        gameOver: { ...state.gameOver, isGameOver: true, isWon: false, killedByIdx: payload },
      };
    case "OPEN_MODAL":
      return {...state,isModalOpen:true}
    case "RESET":
      return state;
  }
};
type ProviderType = {
  children: React.ReactNode;
  player: PlayerType;
  enemies: EnimiesType[];
  endPoint: number[];
};
const GamePlayContextProvider: React.FC<ProviderType> = ({
  player,
  enemies,
  children,
  endPoint,
}) => {
  const initialState = {
    playerPosition: player.start_position,
    enemiesPositions: enemies.map((e: EnimiesType) => e.start_position),
    playerDirection: player.startDirection,
    enemiesDirection: enemies.map((e: EnimiesType) => e.startDirection),
    gameOver: {
      isGameOver: false,
      isWon: false,
      killedByIdx: 0,
    },
    isModalOpen: false,
  };
  const [gamePlayState, gamePlayDispatch] = useReducer(reducer, initialState, init);
  const checkForWin = () => {
    if (
      gamePlayState.playerPosition[0] === endPoint[0] &&
      gamePlayState.playerPosition[1] === endPoint[1]
    ) {
      gamePlayDispatch({ type: "WIN" });
    }
  };
  const checkForLost = () => {
    const enemyIndex = gamePlayState.enemiesPositions.findIndex((enemy) => {
      const player = gamePlayState.playerPosition;
      return (
        (enemy[0] + 1 === player[0] && enemy[1] === player[1]) ||
        (enemy[0] - 1 === player[0] && enemy[1] === player[1]) ||
        (enemy[0] === player[0] && enemy[1] + 1 === player[1]) ||
        (enemy[0] === player[0] && enemy[1] - 1 === player[1])
      );
    });
    if (enemyIndex !== -1) {
      gamePlayDispatch({ type: "LOST", payload: enemyIndex });
    }
  };
  return (
    <GamePlayContext.Provider
      value={{
        gamePlayState,
        gamePlayDispatch,
        checkForLost,
        checkForWin,
      }}
    >
      {children}
    </GamePlayContext.Provider>
  );
};

export default GamePlayContextProvider;
export const useGamePlayContext = () => useContext(GamePlayContext) as GamePlayContextType;
