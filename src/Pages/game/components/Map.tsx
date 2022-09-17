import React, { RefObject, useMemo } from "react";
import { RefBoxType } from "../../../Types/GameSettingsTypes";
import { useGameSettingsContext } from "../../context/GameSettingsContext";

import "../styles/map.scss";
import MapBox from "./MapBox";

let boxCount = 0;
const Map: React.FC<{ map: number[][] }> = ({ map }) => {
  boxCount = 0;
  const { mapRef, SCREEN_WIDTH, boxesRef } = useGameSettingsContext();
  const TILE_SIZE = SCREEN_WIDTH / map[0].length;

  const levelMap = useMemo(() => {
    return map.map((row, index) => {
      return (
        <MapRow
          boxesRef={boxesRef}
          row={row}
          rowIndex={index}
          key={index}
          TILE_SIZE={TILE_SIZE}
        />
      );
    });
  }, [TILE_SIZE, map]);
  return (
    <div style={{ color: "white" }} ref={mapRef} className="map-container">
      <div className="map__cells">{levelMap}</div>
    </div>
  );
};

export default Map;

type Props = {
  row: number[];
  rowIndex: number;
  TILE_SIZE: number;
  boxesRef: RefObject<RefBoxType>;
};
export const MapRow: React.FC<Props> = ({ boxesRef, row, rowIndex, TILE_SIZE }) => {

  const rows = row.map((col: any, index: any) => {
    return (
      <MapBox
        boxCount={boxCount++}
        col={col}
        index={index}
        rowIndex={rowIndex}
        key={index}
        TILE_SIZE={TILE_SIZE}
        boxesRef={boxesRef}
      />
    );
  });
  return <div className="map-row">{rows}</div>;
};
