import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import React, { useState } from "react";
import Header from "./components/Header";
import Map from "./components/Map";
// import GamePlay from "./components/GamePlay";
import "./styles/global.scss";

import { useIonRouter } from "@ionic/react";
import { useLevelContext } from "../context/LevelContext";
// import { tempLevel as currentLevel } from "./temp";
import PlayerDataContextProvider from "../context/GameSettingsContext";
import GameSettings from "./components/GameSettings";

// type Match = {match:any}

const GamePage: React.FC = () => {
  const router = useIonRouter();
  const levelCode = router.routeInfo.routeOptions;
  const { allLevels } = useLevelContext();
  const currentLevel = allLevels.find((level) => level.code === levelCode);
  // const { map, enemies, step_cap, code } = tempLevel!;
  // const [isLoaded, setIsLoaded] = useState(false);

  return (
    <IonPage>
      <PlayerDataContextProvider currentLevel={currentLevel!}>
        <Header />
        <IonContent color={"dark"}>
          <div className="game-map__container">
            <Map map={currentLevel!.map} />
            <GameSettings currentLevel={currentLevel!} />
          </div>
        </IonContent>
      </PlayerDataContextProvider>
    </IonPage>
  );
};

export default GamePage;
