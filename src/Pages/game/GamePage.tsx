//עמוד משחק ראשי
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "./components/Header";
import Map from "./components/Map";

import "./styles/global.scss";

import { useIonRouter } from "@ionic/react";
import { useLevelContext } from "../context/LevelContext";

import PlayerDataContextProvider from "../context/GameSettingsContext";
import GameSettings from "./components/GameSettings";



const GamePage: React.FC = () => {
  const router = useIonRouter();
  const levelCode = router.routeInfo.routeOptions;
  const { allLevels } = useLevelContext();
  const currentLevel = allLevels.find((level) => level.code === levelCode);

//קומפוננטה עוטפת ראשית של שלב-מרנדרת את המפה, עם הגדרות השלב המתאימות על פי הקוד שלו
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
