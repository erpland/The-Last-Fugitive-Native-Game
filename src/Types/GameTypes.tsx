export interface SpriteSheetType {
  [key: string]: SpriteFrameType[];
}
interface GameOverType {
  isGameOver: boolean;
  isWon: boolean;
  killedByIdx: number;
}
export interface SpriteFrameType {
  filename: string;
  frame: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  rotated: boolean;
  trimmed: boolean;
  spriteSourceSize: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  sourceSize: {
    w: number;
    h: number;
  };
}
export interface GamePlayContextType {
  gamePlayState: GamePlayContextStateType;
  gamePlayDispatch: React.Dispatch<GamePlayContextActionType>;
  checkForLost: () => void;
  checkForWin: () => void;
}
export interface GamePlayContextStateType {
  playerDirection: string;
  playerPosition: number[];
  enemiesPositions: number[][];
  enemiesDirection: string[];
  isModalOpen: boolean;
  gameOver: GameOverType;
}
export interface GamePlayContextActionType {
  type: "CHANGE_PLAYER_POSITION" | "CHANGE_ENEMIES_POSITION" | "WIN" | "LOST" | "OPEN_MODAL" | "RESET";
  payload?: any;
}
export interface PlayerStateType {
  playerState: "idle" | "move" | "die";
  currentFrame: number;
}
export interface PlayerActionType {
  type: "NEXT_FRAME" | "CHANGE_PLAYER_STATE";
  payload?: any;
}
