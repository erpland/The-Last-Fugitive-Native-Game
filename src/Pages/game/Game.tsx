import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "./components/Header";
import Map from "./components/Map";
import TurnSystem from "./components/TurnSystem";
import "./styles/global.scss";

import { useIonRouter } from "@ionic/react";
import { useLevelContext } from "../context/LevelContext";

// type Match = {match:any}

const Game: React.FC = () => {
  const router = useIonRouter();
  const levelCode = router.routeInfo.routeOptions;
  const { allLevels, hints } = useLevelContext();
  const currentLevel = allLevels.find((level) => level.code === levelCode);
  const { map, player, enemies, step_cap, code } = currentLevel!;

  
  console.log("render");
  return (
    <IonPage>
      <Header />
      <IonContent color={"dark"}>
        <div className="game-map__container">
          <Map map={map} />
          <TurnSystem
            player={player}
            enemies={enemies}
            map={map}
            steps={step_cap}
            levelCode={code}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Game;
