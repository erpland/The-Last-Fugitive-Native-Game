import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "./components/Header";
import Map from "./components/Map";
import TurnSystem from "./components/TurnSystem";
import "./styles/global.scss";
import { tempLevel } from "./temp.js";

// type Match = {match:any}

const Game: React.FC = () => {
  const { map, player, enemies } = tempLevel;
  return (
    <IonPage >
      <Header />

    <IonContent color={'dark'} >
        <div className="game-map__container">
          <Map map={map} />
          <TurnSystem player={player} enemies={enemies} map={map} />
        </div>
    </IonContent>
    </IonPage>
    // <div>Game - {match.params.level}

    // </div>
  );
};

export default Game;
