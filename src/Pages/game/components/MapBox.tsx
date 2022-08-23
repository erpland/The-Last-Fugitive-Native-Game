import { image } from "ionicons/icons";
import { relative } from "path";
import React from "react";
import { TILE_SIZE } from "../constants/constants";
import { assetsMap } from "../constants/helpers";

type Props = {
  col: number;
  index: number;
  rowIndex: number;
};

const MapBox: React.FC<Props> = ({ col, index, rowIndex }) => {
  let isColider = false;
  let isWinTile = false;
  const getTile = (type: any) => {
    switch (type) {
      case -1:
        isWinTile = true;
        return `tile${randomTile(assetsMap.TILES)}`;
      case 0:
        isColider = false;
        return `tile${randomTile(assetsMap.TILES)}`;
      case 1:
      case 2:
      case 3:
      case 4:
        isColider = true;
        return `tile${randomTile(assetsMap.TILES)}`;
      default:
        break;
    }
  };
  const randomTile = (elements: number) => {
    return Math.floor(Math.random() * (elements + 1));
  };
  const getColider = () => {
    let imgUrl;
    switch (col) {
      case 1:
        imgUrl = `colliders/colider${randomTile(assetsMap.COLIDERS)}.png`;
        break;
      case 2:
        imgUrl = "walls/wall_front.png";
        break;
      case 3:
        imgUrl = "walls/wall_left.png";
        break;
      case 4:
        imgUrl = "walls/wall_right.png";
        break;
      default:
        break;
    }
    return (
      <img
        style={{ width: "100%",height:'100%'}}
        src={`./Assets/game/${imgUrl}`} alt=""/>
    );
  };
  return (
    <div
      style={{
        backgroundImage: `url(./Assets/game/tileset/${getTile(col)}.png)`,
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
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {getColider()}
        </div>
      )}
    </div>
  );
};
export default MapBox;
