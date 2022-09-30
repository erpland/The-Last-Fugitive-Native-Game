//קומפוננטה לייצוג חלק עליון של המסך-הצגת נתונים על צעדים, תור,הצגת רמז על ידי חישוב מתאים
import { IonButton, IonIcon, useIonRouter } from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import React from "react";
import { useGameSettingsContext } from "../../context/GameSettingsContext";
import "../styles/header.scss";

type Props = {};

const Header: React.FC<Props> = () => {
  const router = useIonRouter();
  const { settingsState, getHint } = useGameSettingsContext();
  const { hint, isPlayerTurn, steps } = settingsState;
  const handleHint = () => {
    getHint();
  };
  return (
    <div className="header-container">
      <div className="header__data">
        <span>Steps: {steps}</span>
        <span>Turn: {isPlayerTurn ? "Player" : "Monsters"}</span>
      </div>
      {hint && (
        <div className="header__hints">
          <h4>{hint}</h4>
        </div>
      )}
      <div className="header__buttons">
        <IonButton fill="outline"  onClick={handleHint}>
          Hint
        </IonButton>
        <IonButton fill="outline" onClick={() => router.push("/home")}>
          <IonIcon color="warning" icon={arrowForward} />
        </IonButton>
      </div>
    </div>
  );
};

export default Header;
