import { Preferences } from "@capacitor/preferences";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { addLevelRank, updateLevelRank, updateUserCurrentLevel } from "../../Database/database";
import {
  GamePlayContextActionType,
  GamePlayContextStateType,
  GamePlayContextType,
} from "../../Types/GameTypes";
import { EnimiesType, PlayerType, StepCapType } from "../../Types/levelTypes";
import { useGameSettingsContext } from "./GameSettingsContext";
import { useLevelContext } from "./LevelContext";
import { useUserContext } from "./UserContext";

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
      return { ...state, isModalOpen: true };
    case "RESET":
      return state;
  }
};
type ProviderType = {
  children: React.ReactNode;
  player: PlayerType;
  enemies: EnimiesType[];
  endPoint: number[];
  stepCap: StepCapType[];
  levelCode: number;
};
const GamePlayContextProvider: React.FC<ProviderType> = ({
  player,
  enemies,
  children,
  endPoint,
  stepCap,
  levelCode,
}) => {
  const { remainingGames, setRemainingGames, currentUser, setCurrentUser, isGuest } =
    useUserContext();
  const { setCurrentLevel } = useLevelContext();
  const { settingsState } = useGameSettingsContext();
  const { steps } = settingsState;

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
      updatePlayerData();
      gamePlayDispatch({ type: "WIN" });
    }
  };
  const checkForLost = async () => {
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
      await Preferences.set({ key: "games", value: String(remainingGames!.current - 1) });
      setRemainingGames({ ...remainingGames!, current: remainingGames!.current - 1 });
    }
  };

  const calcStars = () => {
    if (steps < stepCap[0].step) {
      return 3;
    } else if (steps < stepCap[1].step) return 2;
    else {
      return 1;
    }
  };
  const updatePlayerData = async () => {
    let level = {
      level_code: levelCode,
      rank: calcStars(),
      popularity: 0,
    };
    if (currentUser.current_level === levelCode) {
      let nextLevel = levelCode + 1;
      addLevelRank(currentUser._id, currentUser.token, level, isGuest);
      updateUserCurrentLevel(currentUser._id, currentUser.token, nextLevel, isGuest);
      const ranks = currentUser.level_rank;
      ranks.push(level);
      setCurrentUser({
        ...currentUser,
        level_rank: ranks,
        current_level: nextLevel,
      });
      setCurrentLevel(nextLevel);
    } else {
      updateLevelRank(currentUser._id, currentUser.token, level, isGuest);
      currentUser.level_rank[levelCode - 1].rank = calcStars();
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
