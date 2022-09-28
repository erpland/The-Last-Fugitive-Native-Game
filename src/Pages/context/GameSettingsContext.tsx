import React, { createContext, useContext, useReducer, useRef } from "react";
import {
  GameSettingsActionType,
  GameSettingsContextType,
  GameSettingsProvider,
  GameSettingsStateType,
} from "../../Types/GameSettingsTypes";
import {
  PROBABILITY_DIFFICULTY_EASY,
  PROBABILITY_DIFFICULTY_HARD,
  PROBABILITY_DIFFICULTY_MEDIUM,
} from "../../utils/Constants";
import Graph from "../game/components/PathSearch";

export const GameSettingsContext = createContext<GameSettingsContextType | null>(null);

///DELETE!
const HINTS = [
  { name: "UP", description: "Go Up" },
  { name: "RIGHT", description: "Go Right" },
  { name: "DOWN", description: "Go Down" },
  { name: "LEFT", description: "Go Left" },
];

const reducer = (state: GameSettingsStateType, action: GameSettingsActionType) => {
  const { type, payload } = action;
  switch (type) {
    case "STEPS_INCRESMENT":
      return { ...state, steps: state.steps + 1 };
    case "CHANGE_TURN":
      return { ...state, isPlayerTurn: payload };
    case "SET_HINT":
      return { ...state, hint: payload };
    case "CLEAR_HINT":
      return { ...state, hint: "" };
    case "RESET":
      return init(initialState);
  }
};
const initialState = {
  steps: 0,
  isPlayerTurn: true,
  hint: "",
};
const init = (initialState: any) => {
  return initialState;
};

const GameSettingsContextProvider: React.FC<GameSettingsProvider> = ({
  currentLevel,
  children,
}) => {
  const [settingsState, settingsDispatch] = useReducer(reducer, initialState, init);
  const mapRef = useRef(null);
  const SCREEN_WIDTH = window.innerWidth;
  const boxesRef = useRef({});
  const enemyGraph = useRef(new Graph(currentLevel.map));
  const playerGraph = useRef(
    new Graph(
      currentLevel.map,
      `${currentLevel.player.start_position[0]}_${currentLevel.player.start_position[1]}`,
      `${currentLevel.end_point[0]}_${currentLevel.end_point[1]}`
    )
  );

  const getHint = () => {
    // פונקציה להחזרת רמז לצעד הבא הכי טוב לשחקן
    // משתמשת באלגוריתם חיפוש הדרך הקצרה ביותר ליציאה
    const path = playerGraph.current!.startAlgorithm().path;
    let askedHint = "No Clue For You";
    if (path.length) {
      const nextMoveY = parseInt(path[1][0]);
      const nextMoveX = parseInt(path[1][1]);
      const pos = playerGraph.current!.start.split("_");
      const playerY = parseInt(pos[0]);
      const playerX = parseInt(pos[1]);
      if (nextMoveY < playerY) {
        askedHint = HINTS[0].description;
      } else if (nextMoveX > playerX) {
        askedHint = HINTS[1].description;
      } else if (nextMoveY > playerY) {
        askedHint = HINTS[2].description;
      } else if (nextMoveX < playerX) {
        askedHint = HINTS[3].description;
      }
    }
    settingsDispatch({ type: "SET_HINT", payload: askedHint });
  };
  const getProbability = () => {
    switch (currentLevel.diffculty) {
      default:
      case 1:
        return PROBABILITY_DIFFICULTY_EASY;

      case 2:
        return PROBABILITY_DIFFICULTY_MEDIUM;

      case 3:
        return PROBABILITY_DIFFICULTY_HARD;
    }
  };
  const PROBABILITY = getProbability();

  return (
    <GameSettingsContext.Provider
      value={{
        SCREEN_WIDTH,
        mapRef,
        boxesRef,
        playerGraph,
        enemyGraph,
        getHint,
        PROBABILITY,
        settingsState,
        settingsDispatch,
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};

export default GameSettingsContextProvider;
export const useGameSettingsContext = () =>
  useContext(GameSettingsContext) as GameSettingsContextType;
