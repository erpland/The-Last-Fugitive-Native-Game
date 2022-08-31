import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import React, { useState } from "react";
import Header from "./components/Header";
import Map from "./components/Map";
import GamePlay from "./components/GamePlay";
import "./styles/global.scss";

import { useIonRouter } from "@ionic/react";
import { useLevelContext } from "../context/LevelContext";

// type Match = {match:any}

const GamePage: React.FC = () => {
  const router = useIonRouter();
  const levelCode = router.routeInfo.routeOptions;
  const { allLevels } = useLevelContext();
  const currentLevel = allLevels.find((level) => level.code === levelCode);
  const { map, player, enemies, step_cap, code } = currentLevel!;
  const [isLoaded, setIsLoaded] = useState(false)
  
  return (
    <IonPage>
      
      <Header />
      <IonContent color={"dark"}>
        <div className="game-map__container">
          <Map map={map} />
          <GamePlay
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

export default GamePage;
