<<<<<<< HEAD
//עמוד משחק ראשי
import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import Header from "./components/Header";
import Map from "./components/Map";

=======
import { IonContent, IonPage } from "@ionic/react";
import React, { useState } from "react";
import Header from "./components/Header";
import Map from "./components/Map";
>>>>>>> 612417001bf4c40c9323be7d54f4ef6cbc552292
import "./styles/global.scss";

import { useIonRouter } from "@ionic/react";
import { useLevelContext } from "../context/LevelContext";
<<<<<<< HEAD

import PlayerDataContextProvider from "../context/GameSettingsContext";
import GameSettings from "./components/GameSettings";



=======
import PlayerDataContextProvider from "../context/GameSettingsContext";
import GameSettings from "./components/GameSettings";

>>>>>>> 612417001bf4c40c9323be7d54f4ef6cbc552292
const GamePage: React.FC = () => {
  const router = useIonRouter();
  const levelCode = router.routeInfo.routeOptions;
  const { allLevels } = useLevelContext();
  const [gameKey, setgameKey] = useState(0);
  const currentLevel = allLevels.find((level) => level.code === levelCode);
<<<<<<< HEAD
=======
  const resetLevel = () => {
    console.log(gameKey)
    setgameKey(gameKey + 1);
  };
>>>>>>> 612417001bf4c40c9323be7d54f4ef6cbc552292

//קומפוננטה עוטפת ראשית של שלב-מרנדרת את המפה, עם הגדרות השלב המתאימות על פי הקוד שלו
  return (
    <IonPage key={gameKey}>
      <PlayerDataContextProvider currentLevel={currentLevel!}>
        <Header />
        <IonContent color={"dark"}>
          <div className="game-map__container">
            <Map map={currentLevel!.map} />
            <GameSettings currentLevel={currentLevel!} resetLevel={resetLevel} />
          </div>
        </IonContent>
      </PlayerDataContextProvider>
    </IonPage>
  );
};

export default GamePage;
