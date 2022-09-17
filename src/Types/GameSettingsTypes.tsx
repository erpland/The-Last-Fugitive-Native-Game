import { RefObject, SetStateAction } from "react";
import Graph from "../Pages/game/components/PathSearch";
import { LevelType } from "./levelTypes";

export interface GameSettingsActionType {
  type: "STEPS_INCRESMENT" | "CHANGE_TURN" | "SET_HINT" | "CLEAR_HINT" | "RESET";
  payload?: any;
}
export interface GameSettingsStateType {
  steps: number;
  hint: string;
  isPlayerTurn: boolean;
}
export interface RefBoxType {
  [key: string]: HTMLDivElement;
}

export interface GameSettingsProvider {
  children: React.ReactNode;
  currentLevel: LevelType;
}
export interface GameSettingsContextType {
  // playerData: PlayerData;
  // setPlayerData: React.Dispatch<React.SetStateAction<PlayerData>>;
  SCREEN_WIDTH: number;
  mapRef: RefObject<HTMLDivElement>;
  boxesRef: RefObject<RefBoxType>;
  // hint: string;
  playerGraph: RefObject<Graph>;
  enemyGraph: RefObject<Graph>;
  getHint: () => void;
  // setHint: React.Dispatch<SetStateAction<string>>;
  PROBABILITY: number;
  settingsState: GameSettingsStateType;
  settingsDispatch: React.Dispatch<GameSettingsActionType>;
}
