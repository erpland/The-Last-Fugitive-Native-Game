import React from 'react'
import { TILE_SIZE } from '../constants/constants'

type Props = {
  col:number
  index:number
  rowIndex:number
}

const MapBox:React.FC<Props> = ({col,index,rowIndex}) => {
  let isColider = false;
  let isWinTile = false;
  const getTile = (type:any) => {
    switch (type) {
      case -1:
        isWinTile = true;
        return `tile${randomTile(type)}`;
      case 0:
        isColider = false;
        return `tile${randomTile(type)}`;
      case 1:
        isColider = true;
        return `tile${randomTile(type)}`;
      default:
        break;
    }
  };
  const randomTile = (type:any) => {
    if (type === 0) return Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    else {
      return Math.floor(Math.random() * (3 - 1) + 1) + 1;
    }
  };


  return (
    <div
    style={{
      backgroundImage: `url(./Assets/game/${getTile(col)}.png)`,
      height: TILE_SIZE,
      width: TILE_SIZE,
      backgroundSize: "cover",
    }}
    className={ isWinTile  ? "winTile" : ""}
    data-x={index}
    data-y={rowIndex}
    data-colider={isColider}
    data-win_tile={isWinTile}
  ></div>
  )

}
export default MapBox