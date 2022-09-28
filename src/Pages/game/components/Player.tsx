//קומפוננטה של שחקן
import React, { createRef, useEffect, useReducer, useRef } from "react";
import { PlayerActionType, PlayerStateType, SpriteFrameType } from "../../../Types/GameTypes";
import { DIR_CSS, GAME_SPEED } from "../../../utils/Constants";
import { useGamePlayContext } from "../../context/GamePlayContext";
import { useGameSettingsContext } from "../../context/GameSettingsContext";
import { useMusicContext } from "../../context/MusicContext";
import spriteSheetMap from "../Assets/Player/playerFull.json";
import spriteSheetImg from "../Assets/Player/playerFull.png";
import "../styles/player.scss";
//שליטה בפריים התמונה ומצב השחקן(עומד/הולך)
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
  //מצייר את השחקן על המסך
  const canvasRef = createRef<HTMLCanvasElement>();
  //רפרנס לדיב אשר מתזמן את תזוזת השחקן
  const playerDivRef = createRef<HTMLDivElement>();
  //רפרנס תמונת השחקן אשר מולבשת על הדיב
  const playerSprite = useRef<HTMLImageElement | null>(null);
  const [state, dispatch] = useReducer(reducer, {
    playerState: "idle",
    currentFrame: 0,
  });
//אובייקט השחקן על פי משיכתו מASSETS
//הפריים הנוכחי במיקום התמונה של השחקן במערך הJSON  
  const playerFrame = useRef<SpriteFrameType>(spriteSheetMap.player.idle[state.currentFrame]);
  //אתחול אובייקט תמונה על מנת לשייך תמונה לשחקן
  useEffect(() => {
    playerSprite.current = new Image();
    playerSprite.current.src = spriteSheetImg;
  }, []);
  //ציור השחקן על המסך כל פעם שהשתנה פריים-כלומר קורה באופן קבוע כל 4 פריימים 
  useEffect(() => {
    if (gameFrame % GAME_SPEED === 0) {
      drawPlayer();
    }
  }, [gameFrame]);
//ברגע שהקונטקסט התעדכן-מעדכנים את הגרף אשר משמש לחישוב רמזים+מיקום שחקן בגרף אוייבים
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
//בדיקה שזהו תור השחקן
  useEffect(() => {
    if (isPlayerTurn) {
      mapRef.current!.onclick = (e: any) => {
        //שליפת X Y של המשבצות
        const y = e.target!.dataset.y
          ? parseInt(e.target!.dataset.y)
          : parseInt(e.target.parentNode.parentNode.dataset.y);
        const x = e.target!.dataset.x
          ? parseInt(e.target!.dataset.x)
          : parseInt(e.target.parentNode.parentNode.dataset.x);
          //בדיקה האם זה מכשול
        let isColider = e.target.dataset.colider || e.target.parentNode.parentNode.dataset.colider;
        //ווידוי צעד-האם ניתן לזוז
        //אם ניתן לזוז-נעדכן את תזוזת השחקן, ואת מיקומו על המפה
        if (validateMove(isColider, y, x)) {
          gamePlayDispatch({ type: "CHANGE_PLAYER_POSITION", payload: { y, x } });
          //אחרת נדגיש את הצעדים אשר ניתן לבצע.
        } else {
          playWrongTile()
          handleInvalidPosition();
        }
      };
    }
    //ברגע שזה לא צעד של שחקן-לא ניתן לבצע צעד תוך כדי צעד של האוייב
     else {
      mapRef.current!.onclick = () => {
        playWrongTile()
      };
    }
  }, [isPlayerTurn]);
//טיפול בלחיצה על משבצת לא נכונה-הדגשה של כלל המשבצות הסמוכות בהתאמה)(ימינה שמאלה למטה למעלה)
//אם הצעד אינו מכשול נדגיש אותו באדום לציין את הצעדים המותרים לביצוע
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
  //ציור השחקן על ידי קנבס
  //כל קריאה לפונקציה נצייר את השחקן בהתאמה למצבו(עמידה/הליכה) ומיקום הפריים המסויים בג'ייסון
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
// הזזת שחקן-מניפולציית CSS
  const movePlayer = () => {
    mapRef.current!.onclick = () => {};
    playerDivRef.current!.style.transform = DIR_CSS[gamePlayState.playerDirection];
    //חישוב מיקום על פי מיקום גובה וצד שמאל-בהתאמה מול גודל המשבצת הקבוע
    playerDivRef.current!.style.top = `${gamePlayState.playerPosition[0] * TILE_SIZE}px`;
    playerDivRef.current!.style.left = `${gamePlayState.playerPosition[1] * TILE_SIZE}px`;
    //שינוי אנימציית תזוזה
    dispatch({ type: "CHANGE_PLAYER_STATE", payload: "move" });
    //כאשר סיים את התזוזה-נעדכן את הערכים בהתאם-מצב עמידה,סופר צעד,בודק ניצחון/הפסד,מעדכן תור
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
  //פונקציה לביצוע וולידציה-האם ניתן לבצע צעד(לא חרגנו מהמפה, אין אוייב במשבצת סמוכה וכו)
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
