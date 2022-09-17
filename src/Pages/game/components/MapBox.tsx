import React, { createRef, RefObject, useEffect } from "react";
import { RefBoxType } from "../../../Types/GameSettingsTypes";
import { COLLIDERS_IMAGES, TILES_IMAGES } from "../Assets/Assets";

type Props = {
  col: number;
  index: number;
  rowIndex: number;
  TILE_SIZE: number;
  boxCount: number;
  boxesRef: RefObject<RefBoxType>;
};
let coliderCount = 0;
const MapBox: React.FC<Props> = ({ boxesRef, boxCount, col, index, rowIndex, TILE_SIZE }) => {
  const boxRef = createRef<HTMLDivElement>();
  useEffect(() => {
    if (boxRef.current) {
      const key = `${rowIndex}_${index}`;
      boxesRef.current![key] = boxRef.current;
    }
  }, [boxRef]);

  let isColider = false;
  let isWinTile = false;
  const getTile = (type: any) => {
    switch (type) {
      default:
      case 0:
        isColider = false;
        break;
      case -1:
        isWinTile = true;
        break;
      case 1:
        isColider = true;
        break;
    }
    return `url(${TILES_IMAGES[boxCount % TILES_IMAGES.length]})`;
  };
  const getColider = () => {
    return <img src={COLLIDERS_IMAGES[coliderCount++ % COLLIDERS_IMAGES.length]} alt="" />;
  };

  return (
    <div
      ref={boxRef}
      style={{
        backgroundImage: getTile(col),
        height: TILE_SIZE,
        width: TILE_SIZE,
        backgroundSize: "cover",
        position: "relative",
      }}
      className={isWinTile ? "winTile" : ""}
      data-x={index}
      data-y={rowIndex}
      data-colider={isColider}
      data-win_tile={isWinTile}
    >
      {col > 0 && (
        <div className="box__collider" style={{}}>
          {getColider()}
        </div>
      )}
      {col === -1 && (
        <div className="box__exit">
          <span>Exit</span>
        </div>
      )}
    </div>
  );
};
export default MapBox;
