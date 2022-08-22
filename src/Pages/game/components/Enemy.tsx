import React, {
  createRef,
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { TILE_SIZE } from "../constants/constants";
import "../styles/player.scss";
import enemyFullJSON from "../Assets/Enemy/EnemyFull.json";
import enemyFullImg from "../Assets/Enemy/EnemyFull.png";
import { directionMap } from "../constants/helpers";
type Props = {
  position: number[];
  direction: string;
  playerPosition: number[];
  setCurrentTile: (pos: any) => void;
  setIsPlayerMove: (val: boolean) => void;
  isPlayerMove: boolean;
  MAP: number[][];
};

const Enemy: React.FC<Props> = ({
  position,
  direction,
  playerPosition,
  isPlayerMove,
  setIsPlayerMove,
  setCurrentTile,
  MAP,
}) => {
  const canvasRef = createRef<HTMLCanvasElement>();
  const enemyDivRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [counter, setCounter] = useState(0);
  const [enemyState, setEnemyState] = useState("idle");
  const [enemyCurrentPosiotion, setEnemyCurrentPosition] = useState(position);
  const [enemyCurrentDirection, setEnemyCurrentDirection] = useState(
    directionMap[direction]
  );
  let enemyFrame = enemyFullJSON.enemy.idle[currentFrame];
  let enemySprite: any, degress;

  //recursive game loop - create animations frames
  useLayoutEffect(() => {
    let timerId: number;
    const animate = () => {
      setCounter((c) => c + 1);
      timerId = requestAnimationFrame(animate);
    };
    timerId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(timerId);
  }, []);

  //create new image every 5 frames (for animation)
  useEffect(() => {
    enemySprite = new Image();
    enemySprite.src = enemyFullImg;
    enemySprite.onload = () => {
      drawEnemy();
    };
  }, [counter % 5 === 0]);

  useEffect(() => {
    if (!isPlayerMove) {
      let nextMove:any = getNextMove();
      if (nextMove) {
        let nextDirection = getEnemyNextDirection(nextMove);
        if (nextDirection !== enemyCurrentDirection) {
          let degress = getEnemyNextDirectionDegree(nextDirection);
          changeDirection(degress!);
          setEnemyCurrentDirection(nextDirection);
        }
      }
      enemyDivRef.current!.style.left = `${nextMove[0] * TILE_SIZE}px`;
      enemyDivRef.current!.style.top = `${nextMove[1]  * TILE_SIZE}px`;
      setEnemyCurrentPosition(nextMove);
      setCurrentTile(nextMove);
      endTurn();
    }
  }, [isPlayerMove]);

  useEffect(() => {
    enemyDivRef.current!.style.left = `${enemyCurrentPosiotion[0] * TILE_SIZE}px`;
    enemyDivRef.current!.style.top = `${enemyCurrentPosiotion[1]  * TILE_SIZE}px`;
    let degree = getEnemyNextDirectionDegree(enemyCurrentDirection);
    changeDirection(degree!);
  }, []);
  //draw sprite in canvas
  const drawEnemy = () => {
    if (canvasRef && canvasRef.current) {
      const ctx = canvasRef.current?.getContext("2d")!;
      const draw = () => {
        ctx.clearRect(0, 0, TILE_SIZE, TILE_SIZE);
        getEnemyState();

        ctx.drawImage(
          enemySprite,
          enemyFrame.frame.x,
          enemyFrame.frame.y,
          enemyFrame.frame.w,
          enemyFrame.frame.h,
          0,
          0,
          TILE_SIZE,
          TILE_SIZE
        );
        animate();
      };

      draw();
    }
  };
// gets the currect image defiend by enemy movment state
  const getEnemyState = () => {
    switch (enemyState) {
      case "idle":
        enemyFrame = enemyFullJSON.enemy.idle[currentFrame];
        break;
      case "move":
        enemyFrame = enemyFullJSON.enemy.move[currentFrame];
        break;
      case "attack":
        enemyFrame = enemyFullJSON.enemy.attack[currentFrame];
        break;
      default:
        break;
    }
  };
  //sets the current animation frame
  const animate = () => {
    if (currentFrame < enemyFullJSON.enemy.idle.length - 1) {
      setCurrentFrame((f) => f + 1);
    } else {
      setCurrentFrame(0);
    }
  };
  //gets the enemy next valid position
  const getNextMove = () => {
    let x = enemyCurrentPosiotion[0];
    let y = enemyCurrentPosiotion[1];
    let nextPosition: number[] | Boolean = false;
    while (!nextPosition) {
      let nextDirection = Math.floor(Math.random() * 4);
      switch (nextDirection) {
        case directionMap.UP:
          nextPosition = isValidMove(y - 1, false, x, y) ? [x, y - 1] : false;
          break;
        case directionMap.DOWN:
          nextPosition = isValidMove(y + 1, false, x, y) ? [x, y + 1] : false;
          break;
        case directionMap.LEFT:
          nextPosition = isValidMove(x - 1, true, x, y) ? [x - 1, y] : false;
          break;
        case directionMap.RIGHT:
          nextPosition = isValidMove(x + 1, true, x, y) ? [x + 1, y] : false;
          break;
        default:
          break;
      }
    }
    return nextPosition;
  };
  // checks if the next position is valid
  const isValidMove = (nextPos: number, isX: boolean, x: number, y: number) => {
    return isX ? MAP[y][nextPos] !== 1 : MAP[nextPos][x] !== 1;
  };
  // gets the enemy next direction
  const getEnemyNextDirection = (nextPosition: any) => {
    if (nextPosition[0] > enemyCurrentPosiotion[0]) return directionMap.RIGHT;
    else if (nextPosition[0] < enemyCurrentPosiotion[0])
      return directionMap.LEFT;
    else if (nextPosition[1] > enemyCurrentPosiotion[1])
      return directionMap.DOWN;
    else if (nextPosition[1] < enemyCurrentPosiotion[1]) return directionMap.UP;
  };
  // get the enemy roation degree (if needed)
  const getEnemyNextDirectionDegree = (askedDirection:number) => {
    switch (askedDirection) {
      case directionMap.UP:
        return 270 % 360;

      case directionMap.DOWN:
        return 90 % 360;

      case directionMap.LEFT:
        return 180 % 360;

      case directionMap.RIGHT:
        return 0 % 360;

      default:
        break;
    }
  };
  // changes the enemy direction (if needed)
  const changeDirection = (degress:number) => {
    enemyDivRef.current!.style.transform = "rotate(0)";
    enemyDivRef.current!.style.transform =
      degress >= 180 ? `rotate(${degress - 360}deg)` : `rotate(${degress}deg)`;
  };
  // finishs enemey turn
  const endTurn = () => {
    enemyDivRef.current!.ontransitionend = (t) => {
      if (t.propertyName === "left" || t.propertyName === "top") {
        setEnemyState("idle");
        setIsPlayerMove(true);
      }
    };
  };
  return (
    <div
      ref={enemyDivRef}
      data-colider={true}
      data-type={"enemy"}
      className="player"
      style={{width:TILE_SIZE,height:TILE_SIZE}}
      // style={{ transform: "rotate(0deg)" }}
    >
      <canvas
        style={{ pointerEvents: "none", zIndex: 100 }}
        ref={canvasRef}
        width={TILE_SIZE}
        height={TILE_SIZE}
      />
      <h1 style={{
        textAlign:'center',
          border: "1px solid red",
          transform: "rotate(0deg)",
          transition: "3s",
        }}> {"➜"}</h1>
    </div>
  );
};

export default Enemy;
