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
  const [isWon,setIsWon] = useState(true)
  const { map, player, enemies,step_cap,code } = tempLevel;
  return (
    <IonPage>
        <FinishModal isModalOpen={isModalOpen} isWon={isWon} stepCap={step_cap} levelCode={code}/> 
        <Header/>
        <IonContent color={"dark"}>
          <div className="game-map__container">
            <Map map={map} />
            <TurnSystem
              player={player}
              enemies={enemies}
              map={map}
              isFinished={isModalOpen}
              setIsFinished={(val)=>setIsModalOpen(val)}
              setIsWon = {(val)=>setIsWon(val)}
            />
          </div>
        </IonContent>
    </IonPage>
    // <div>Game - {match.params.level}

    // </div>
  );
};

export default Game;
