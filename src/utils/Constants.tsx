export const CLIENT_HEIGHT = window.innerHeight;
export const CLIENT_WIDTH = window.innerWidth;
export const TILE_SIZE = CLIENT_WIDTH / 13;
export const TOAST_DURATION = 3000;
export const PLAY_DATE_TIMER = 1800 * 1000;
export const REMAINING_GAMES_TIMER = 180000;
export const PROBABILITY_DIFFICULTY_EASY = 2;
export const PROBABILITY_DIFFICULTY_MEDIUM = 5;
export const PROBABILITY_DIFFICULTY_HARD = 7;
export const GAME_SPEED = 4;
export const DIR_CSS: { [key: string]: string } = {
  RIGHT: "scaleX(1) translate(10%,-25%)",
  LEFT: "scaleX(-1) translate(15%,-25%)",
};
