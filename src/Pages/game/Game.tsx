import { IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import FinishModal from "../home/components/FinishModal";
import Header from "./components/Header";
import Map from "./components/Map";
import TurnSystem from "./components/TurnSystem";
import "./styles/global.scss";
import { tempLevel } from "./temp.js";

// type Match = {match:any}

const Game: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { map, player, enemies,step_cap } = tempLevel;
  return (
    <IonPage>
        <FinishModal isModalOpen={isModalOpen} isWon={true} stepCap={step_cap}/> 
        <Header/>
        <IonContent color={"dark"}>
          <div className="game-map__container">
            <Map map={map} />
            <TurnSystem
              player={player}
              enemies={enemies}
              map={map}
            />
          </div>
        </IonContent>
    </IonPage>
    // <div>Game - {match.params.level}

    // </div>
  );
};

export default Game;
