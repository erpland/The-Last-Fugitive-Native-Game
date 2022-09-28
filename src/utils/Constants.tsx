//קבועים לציון גודל חלון
export const CLIENT_HEIGHT = window.innerHeight;
export const CLIENT_WIDTH = window.innerWidth;
export const TILE_SIZE = CLIENT_WIDTH / 13;
//קבוע לציון אורך הALERT
export const TOAST_DURATION = 3000;
//קבוע אשר מבצע חישוב,בכל פעימה של MILI SEC 
//ישמר תאריך משחק חדש-משמש כאשר ממזערים את המשחק וחוזרים אליו
export const PLAY_DATE_TIMER = 1800 * 1000;
//קבוע אשר בכל פעימה יעלה את כמות החיים באחד
export const REMAINING_GAMES_TIMER = 180000;
//הסתברויות לחישוב קושי השלב-רנדומלי או חכם עפ"י דרגת קושי שלב
export const PROBABILITY_DIFFICULTY_EASY = 2;
export const PROBABILITY_DIFFICULTY_MEDIUM = 5;
export const PROBABILITY_DIFFICULTY_HARD = 7;
//מהירות המשחק
export const GAME_SPEED = 4;
//קבוע לשליטה בסיבוב דמויות
export const DIR_CSS: { [key: string]: string } = {
  RIGHT: "scaleX(1) translate(10%,-25%)",
  LEFT: "scaleX(-1) translate(15%,-25%)",
};
